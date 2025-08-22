

import { createRoomDTO, updateBookingIdRoomDTO } from "../dto/room.dto";
import { RoomRepository } from "../repositories/room.repository";
import { roomCategoryRepository } from "./roomCategory.service";


export const roomRepository = new RoomRepository();

export async function createRoom(roomTypeId:number, data: createRoomDTO){
    const category = await roomCategoryRepository.findById(roomTypeId)
    if(!category){
        throw new Error("This RoomCategory not found")
    }
    const room = await roomRepository.create({
        ...data,
        roomTypeId
    });
    return room;
}

export async function findHotelByRoomId(id:number) {
    const room = await roomRepository.findById(id)
    if(!room){
        throw new Error("Room not found");
    }
    const hotel = await roomRepository.findById(room.hotelId);
    if (!hotel) {
        throw new Error("Hotel not found");
    }
    return hotel;
}

export async function findRoomByRoomId(id:number){
    const room = await roomRepository.findById(id)
    if(!room){
        throw new Error("Room not found");
    }
    const roomCategory = await roomRepository.findById(room.roomTypeId);
    if (!roomCategory) {
        throw new Error("Hotel not found");
    }
    return roomCategory
}


export async function deleteRoom(id:number){
    const response = await roomRepository.softDelete(id)
    return response
}
export async function updateRoom(id:number, data : Partial<createRoomDTO>){
    const room = await roomRepository.update(id, data)
    return room
}
export async function getAllRooms(roomCategoryId:number, checkInDate:Date, checkOutDate:Date){
    const roomCategory = await roomCategoryRepository.findById(roomCategoryId)
    if(!roomCategory){
        throw new Error("RoomCategory does not exists")
    }
    const rooms=await roomRepository.findByCategory(roomCategoryId, checkInDate, checkOutDate)
    return rooms
}

export async function getRoomById(roomId:number){
    const room=await roomRepository.findById(roomId)
    return room
}

export async function isRoomAvailable(roomId:number){
    const room=await roomRepository.findById(roomId)
    return room?.bookingId==null;
}

export async function roomBooking(roomId:number){
    const room=await roomRepository.findById(roomId)
    if(!room){
        throw new Error("room not found")
    }
    room.bookingId = Date.now()
    return room
}

export async function updateBookingIdOfBookedRoomService(data:updateBookingIdRoomDTO){
    const updatedRoom = await roomRepository.updateBookingId(data.bookingId, data.roomsId);
    return updatedRoom;
}



