
import { serverConfig } from "../config";
import { redlock } from "../config/redis.config";
import { booking, updateRoomDTO } from "../dto/booking.dto";
import {getAllAvailableRooms, updateBookingIdOfRoom} from '../gateway/hotel.api'
import sequelize from "../models/sequelize";
import {
  createBooking,
  findBookingByIdempotencyKey,
} from "../repository/booking";
import { BadRequestError  } from "../utils/errors/app.error";

// import {v4 as uuid} from 'uuid';

export const createBookingService = async function (
  bookingInput: booking,
  key: any
) {
  const ttl = serverConfig.LOCK_TTL;
  const bookingResource = `locks:hotel:${bookingInput.hotelId}`;
  const availableRooms = await getAllAvailableRooms(bookingInput.categoryId, new Date(bookingInput.checkInDate), new Date(bookingInput.checkOutDate) )
  if(availableRooms.length === 0){
      throw new BadRequestError("Rooms not available"); 
  }
  try {
    await redlock.acquire([bookingResource], ttl);
    return await sequelize.transaction(async (t) => {
      
      const booking = await createBooking(bookingInput, t);
      await updateBookingIdOfRoom(booking.id, availableRooms.map((room:updateRoomDTO)=> room.id))
      return {
          bookingId  : booking.id,
          idempotencyKey : key
      }
    });
  } 
  catch (error:any) {
    throw new Error("Failed to acquire the lock on this resource");
  }
};

export const finalizeBookingService = async function (bookingInput: booking, key: string) {
  try {
    if(key){
        const alreadyBooking = await findBookingByIdempotencyKey(key);
        if(alreadyBooking){
            return alreadyBooking;
        }
    }
    throw new Error("Booking not found for finalization");
  } catch (error) {
    throw error;
  }
};
