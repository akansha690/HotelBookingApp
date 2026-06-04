
import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";
import { createRoom, deleteRoom, getRoomById, updateRoom, getAllRooms, isRoomAvailable, roomBooking, updateBookingIdOfBookedRoomService, reUpdateBookingIdOfBookedRoomService, getRoomsByCategory, getAllRoomsOfHotel } from "../services/room.service";

export async function createRoomHandler(req: Request, res: Response, next: NextFunction) {

    const roomTypeId = Number(req.params.categoryId); 
    const roomResponse = await createRoom(roomTypeId, req.body);
    res.status(StatusCodes.CREATED).json({
        message: "room created successfully",
        data: roomResponse,
        success: true,
    })
}

export async function getRoomsByCategoryHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const roomTypeId = Number(req.params.categoryId);

    const roomsResponse = await getRoomsByCategory(roomTypeId);

    res.status(StatusCodes.OK).json({
        message: "Rooms fetched successfully",
        data: roomsResponse,
        success: true,
    });

}

export async function getAllRoomsOfHotelHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const hotelId = Number(req.params.hotelId);

    const rooms = await getAllRoomsOfHotel(hotelId);

    res.status(StatusCodes.OK).json({
        message: "Rooms fetched successfully",
        data: rooms,
        success: true,
    });

}

export async function getAllAvailableRoomsHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer

    // console.log(req.query.categoryId)

    const categoryId = Number(req.query.categoryId);
    const checkInDate = new Date(req.query.checkInDate as string).toISOString();
    const checkOutDate = new Date(req.query.checkOutDate as string).toISOString();

    // console.log(categoryId)

    const roomsResponse = await getAllRooms(categoryId, checkInDate, checkOutDate);
    // 2. Send the response

    res.status(StatusCodes.OK).json({
        message: "rooms found successfully",
        data: roomsResponse,
        success: true,
    })
}

export async function getRoomHandler(req: Request, res: Response, next: NextFunction) {

    const roomResponse = await getRoomById(Number(req.params.id));

    // 2. Send the response
    res.status(StatusCodes.OK).json({
        message: "room found successfully",
        data: roomResponse,
        success: true,
    });

}

export async function deleteRoomHandler(req: Request, res: Response, next: NextFunction) {

    const roomResponse = await deleteRoom(Number(req.params.id));

    // 2. Send the response
    res.status(StatusCodes.OK).json({
        message: "room deleted successfully",
        data: roomResponse,
        success: true,
    });
    
}

export async function updateRoomHandler(req: Request, res: Response, next: NextFunction) {

    const roomResponse = await updateRoom(Number(req.params.id), req.body);
    res.status(StatusCodes.OK).json({
        message: "room updated successfully",
        data: roomResponse,
        success: true,
    });
}

export async function roomAvailabilityHandler(req: Request, res: Response, next: NextFunction) {

    const roomResponse = await isRoomAvailable(Number(req.params.id));
    res.status(StatusCodes.OK).json({
        message: "room is available to book",
        data: `Room Availabilty is ${roomResponse}`,
        success: true,
    });
    
}

export async function roomBookingHandler(req: Request, res: Response, next: NextFunction) {

    const roomResponse = await roomBooking(Number(req.params.id));
    res.status(StatusCodes.OK).json({
        message: "room booked successfully",
        data: roomResponse,
        success: true,
    });
    
}


export const updateRoomBookingId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const bookingId = Number(req.query.bookingId);

    let roomsId: number[] = [];

    const rawRooms = req.query.roomsId || req.query['roomsId[]'];

    if (!rawRooms) {
      throw new Error("roomsId is missing");
    }

    // normalize to array
    const roomArray = Array.isArray(rawRooms)
      ? rawRooms
      : [rawRooms];

    roomsId = roomArray.map(id => Number(id));

    console.log("ROOMS ID:", roomsId);

    const data = { bookingId, roomsId };

    const finalBooking =
      await updateBookingIdOfBookedRoomService(data);

    res.status(200).json({
      message: "Rooms BookingId updated successfully",
      data: finalBooking,
      success: true,
    });

  } catch (err) {
    next(err);
  }
};

export const reUpdateRoomBookingIdHandler = async (req: Request, res: Response, next: NextFunction) =>  {
    
    const bookingId = Number(req.query.bookingId);
    const reupdate = await reUpdateBookingIdOfBookedRoomService(bookingId);
    res.status(StatusCodes.OK).json({
        message: "Rooms BookingId Re-updated successfully",
        data: reupdate,
        success: true
    })

}
