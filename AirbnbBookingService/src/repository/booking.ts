

import Booking from "../models/booking";
import { BookingStatus } from "../models/booking";

/* ---------------- CREATE ---------------- */
export const createBooking = async function (bookingData: any) {
  try {
    const response = await Booking.create(bookingData);
    return response;
  } catch (error) {
    throw error;
  }
};

/* ---------------- FIND BY IDEMPOTENCY KEY ---------------- */
export const findBookingByIdempotencyKey = async function (key: string) {
  try {
    if (!key) return null;

    const booking = await Booking.findOne({
      where: { idempotencyKey: key },
    });

    return booking || null;
  } catch (error) {
    throw error;
  }
};

/* ---------------- SOFT DELETE (CANCEL) ---------------- */
export const cancelBookingRepo = async (bookingId: number) => {
  try {
    return await Booking.update(
      {
        status: BookingStatus.CANCELLED,
      },
      {
        where: { id: bookingId },
      }
    );
  } catch (error) {
    throw error;
  }
};



/* ---------------- FIND BY ID ---------------- */
export const findBookingById = async (bookingId: number) => {
  try {
    return await Booking.findOne({
      where: { id: bookingId },
    });
  } catch (error) {
    throw error;
  }
};

export const getMyBookingsRepo =
  async (userId: number) => {

  return await Booking.findAll({
    where: {
      userId,
    },
    order: [["createdAt", "DESC"]],
  });
};