import { createRoomCategoryDTO } from "../dto/roomCategory.dto";
import { RoomCategoryRepository } from "../repositories/roomCategory.repository";
import { hotelRepository } from "./hotel.service";

export const roomCategoryRepository = new RoomCategoryRepository();

export async function createRoomCategory(hotelId:number, data: createRoomCategoryDTO){
    const hotel = await hotelRepository.findById(hotelId);
    if(!hotel){
        throw new Error("Hotel not found");
    }
    const roomCategory = await roomCategoryRepository.create({
        ...data,
        hotelId
    });
    return roomCategory;
}

export async function getRoomCategoriesByHotelId(hotelId: number){
    //check if hotel of this id exists
    const hotel = await hotelRepository.findById(hotelId);
    if(!hotel){
        throw new Error("Hotel not found");
    }
    const roomCategories = await roomCategoryRepository.getAllByHotelId(hotelId);
    return roomCategories;
}

export async function getRoomCategoryById(id: number) {
    const roomCategory = await roomCategoryRepository.findById(id);
    if(!roomCategory){
        throw new Error(`Room category of id:${id} not found`);
    }
    return roomCategory;
}

export async function deleteRoomCategory(id: number) {

    const response = await roomCategoryRepository.softDelete(id);
    return response;
}

export async function updateRoomCategory(id: number, data: Partial<createRoomCategoryDTO>) {
    const roomCategory = await roomCategoryRepository.findById(id);
    if(!roomCategory){
        throw new Error(`Room category of id:${id} not found`);
    }
    const updatedRoomCategory = await roomCategoryRepository.update(id, data);
    if(!updatedRoomCategory){
        throw new Error(`Failed to update room category of id:${id}`);
    }
    return updatedRoomCategory;
}