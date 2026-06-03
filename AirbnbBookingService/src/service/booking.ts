import { serverConfig } from "../config";
import { redlock } from "../config/redis.config";
import { booking, updateRoomDTO } from "../dto/booking.dto";
import {
  getAllAvailableRooms,
  reUpdateBookingIdOfRoom,
  updateBookingIdOfRoom,
} from "../gateway/hotel.api";

import { BookingStatus } from "../models/booking";
import sequelize from "../models/sequelize";

import {
  createBooking,
  findBookingByIdempotencyKey,
  findBookingById,
  getMyBookingsRepo,
} from "../repository/booking";

import { BadRequestError } from "../utils/errors/app.error";



/* ---------------- CREATE BOOKING (PENDING ONLY) ---------------- */

export const createBookingService = async function (
  bookingInput: booking,
  key: string
) {
  try {
    const existing = await findBookingByIdempotencyKey(key);
    if (existing) return existing;

    // check availability (NO LOCKING HERE)
    const availableRooms = await getAllAvailableRooms(
      bookingInput.categoryId,
      new Date(bookingInput.checkInDate),
      new Date(bookingInput.checkOutDate)
    );

    if (!availableRooms.data.length) {
      throw new BadRequestError("Rooms not available");
    }

    const booking = await createBooking(bookingInput);

    booking.idempotencyKey = key;
    booking.status = BookingStatus.PENDING;

    const totalAmount = availableRooms.data.reduce(
      (sum: number, room: updateRoomDTO) => sum + room.price,
      0
    );

    booking.bookingAmount =
      bookingInput.numberOfGuests * totalAmount;

    await booking.save();

    return {
      bookingId: booking.id,
      status: booking.status,
      idempotencyKey: key,
      bookingAmount: booking.bookingAmount,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/* ---------------- FINALIZE BOOKING (REDLOCK + ROOM ASSIGN) ---------------- */

export const finalizeBookingService = async function (
  bookingInput: booking,
  key: string
)  {
  const booking = await findBookingByIdempotencyKey(key);

  if (!booking) {
    throw new BadRequestError("Booking not found");
  }

  if (booking.status === BookingStatus.BOOKED) {
    return booking;
  }

  const availableRooms = await getAllAvailableRooms(
    booking.categoryId,
    booking.checkInDate,
    booking.checkOutDate
  );

  if (!availableRooms.data.length) {
    throw new BadRequestError("Rooms not available anymore");
  }

  const roomIds = availableRooms.data.map(
    (room: updateRoomDTO) => room.id
  );

  const lockResources = roomIds.map(
    (id: number) => `locks:room:${id}`
  );

  const ttl = serverConfig.LOCK_TTL;

  const lock = await redlock.acquire(lockResources, ttl);

  try {
    return await sequelize.transaction(async (t) => {

      // assign rooms
      await updateBookingIdOfRoom(booking.id, roomIds);

      booking.status = BookingStatus.BOOKED;
      booking.bookingId = booking.id;

      await booking.save({ transaction: t });

      return {
        bookingId: booking.id,
        status: booking.status,
        roomsAllocated: roomIds,
      };
    });
  } finally {
    if (lock) {
      try {
        await lock.release();
      } catch (e) {
        console.log("Lock release failed:", e);
      }
    }
  }
};

/* ---------------- CANCEL BOOKING ---------------- */

export const cancelBooking = async function (bookingId: number) {
  try {
    return await sequelize.transaction(async (t) => {

      const booking = await findBookingById(bookingId);

      if (!booking) {
        throw new BadRequestError("Booking not found");
      }

      if (booking.status === BookingStatus.CANCELLED) {
        return booking;
      }

      // release rooms
      await reUpdateBookingIdOfRoom(bookingId);

      booking.status = BookingStatus.CANCELLED;

      await booking.save({ transaction: t });

      return {
        bookingId,
        status: booking.status,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMyBookingsService =
  async (userId: number) => {

  return await getMyBookingsRepo(userId);
};