import { createHotelDTO } from "../dto/hotel.dto";
import { HotelRepository } from "../repositories/hotel.repository";
import { roomRepository } from "./room.service";

export const hotelRepository= new HotelRepository();

export async function createHotelService(hotelData: createHotelDTO) {
    const hotel = await hotelRepository.create(hotelData);
    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await hotelRepository.findById(id);
    return hotel;
}

export async function getAllHotelsService() {
    const hotels = await hotelRepository.findAll();
    return hotels;
}

export async function litsAllRoomsOfHotelService(hotelId: number) {
    const hotel = await hotelRepository.findById(hotelId);
    if(!hotel){
        throw new Error("Hotel not found")
    }
    const rooms = await roomRepository.findByHotel(hotelId)
    return rooms;
}

export async function deleteHotelService(id: number) {
    const response = await hotelRepository.softDelete(id);
    return response;
}
export async function updateHotelService(id: number, data: Partial<createHotelDTO>) {
    const response = await hotelRepository.update(id, data);
    return response;
}

