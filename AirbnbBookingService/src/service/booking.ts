
import { serverConfig } from "../config";
import { redlock } from "../config/redis.config";
import { booking, updateRoomDTO } from "../dto/booking.dto";
import {getAllAvailableRooms, reUpdateBookingIdOfRoom, updateBookingIdOfRoom} from '../gateway/hotel.api'
import { BookingStatus } from "../models/booking";
import sequelize from "../models/sequelize";
import {
  createBooking,
  deleteBooking,
  findBookingByIdempotencyKey,
} from "../repository/booking";
import { BadRequestError  } from "../utils/errors/app.error";


export const createBookingService = async function (
  bookingInput: booking,
  key: any
) {
  const ttl = serverConfig.LOCK_TTL;
  const availableRooms = await getAllAvailableRooms(bookingInput.categoryId, bookingInput.checkInDate, bookingInput.checkOutDate)
  if(availableRooms.data.length === 0){
      throw new BadRequestError("Rooms not available"); 
  }
  const bookingResource = availableRooms.data.map((room: updateRoomDTO)=> `locks:room:${room.id}` ) ;
  const lock = await redlock.acquire(bookingResource, ttl);
  try {
    return await sequelize.transaction(async (t) => {
      // console.log(availableRooms.data)
      const booking = await createBooking(bookingInput);
      booking.idempotencyKey = key
      let totalAmount = availableRooms.data.reduce(
        (sum: number, room: any) => sum + room.price,
        0
      );
      booking.bookingAmount = booking.numberOfGuests * totalAmount,
      await booking.save({ transaction: t });
      const updatedRoom = await updateBookingIdOfRoom(booking.id, availableRooms.data.map((room:updateRoomDTO)=> room.id))
      return {
          bookingAmount : booking.numberOfGuests * totalAmount,
          bookingId  : booking.id,
          idempotencyKey : key,
          updatedRoom
      }
    });
  } 
  catch (error:any) {
    console.log(error);
    throw error; 
  } 
  finally {
    if (lock) {
      try {
        await lock.release();
      } catch (releaseError) {
        console.log("Failed to release lock:", releaseError);
      }
    }
  }
}


export const finalizeBookingService = async function (bookingInput: booking, key: string) {
  let alreadyBooking = await findBookingByIdempotencyKey(key);
  return await sequelize.transaction(async (t) => {
    try {
      if(key){
          if(alreadyBooking){
              alreadyBooking.status = BookingStatus.BOOKED
              alreadyBooking.bookingId = alreadyBooking.id
              await alreadyBooking.save()
              return alreadyBooking;
          }
      }
      throw new Error("Booking not found for finalization");
    } catch (error) {
        throw error;
    }
  });

};



export const cancelBooking = async function(bookingId:number){
  try {
    await sequelize.transaction( async (t)=>{
        await deleteBooking(bookingId);
        await reUpdateBookingIdOfRoom(bookingId)
    })

  } catch (error) {
    console.log(error);
    throw error;
  }
}