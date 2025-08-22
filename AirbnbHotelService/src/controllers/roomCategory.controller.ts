
import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";
import { createRoomCategory, deleteRoomCategory, getRoomCategoriesByHotelId, getRoomCategoryById, updateRoomCategory } from "../services/roomCategory.service";

export async function createRoomCategoryHandler(req: Request, res: Response, next: NextFunction) {

    const hotelId = Number(req.params.hotelId); 
    const roomCategoryResponse = await createRoomCategory(hotelId, req.body);
    res.status(StatusCodes.CREATED).json({
        message: "roomCategory created successfully",
        data: roomCategoryResponse,
        success: true,
    })
}

export async function getAllRoomCategoriesHandler(req: Request, res: Response, next: NextFunction) {
    // 1. Call the service layer
    const roomCategoriesResponse = await getRoomCategoriesByHotelId(Number(req.params.hotelId));
    // 2. Send the response

    res.status(StatusCodes.OK).json({
        message: "roomCategories found successfully",
        data: roomCategoriesResponse,
        success: true,
    })
}

export async function getRoomCategoryHandler(req: Request, res: Response, next: NextFunction) {

    const roomCategoryResponse = await getRoomCategoryById(Number(req.params.id));

    // 2. Send the response
    res.status(StatusCodes.OK).json({
        message: "roomCategory found successfully",
        data: roomCategoryResponse,
        success: true,
    });

}

export async function deleteRoomCategoryHandler(req: Request, res: Response, next: NextFunction) {

    const roomCategoryResponse = await deleteRoomCategory(Number(req.params.id));

    // 2. Send the response
    res.status(StatusCodes.OK).json({
        message: "roomCategory deleted successfully",
        data: roomCategoryResponse,
        success: true,
    });
    
}

export async function updateRoomCategoryHandler(req: Request, res: Response, next: NextFunction) {

    const roomCategoryResponse = await updateRoomCategory(Number(req.params.id), req.body);
    res.status(StatusCodes.OK).json({
        message: "roomCategory updated successfully",
        data: roomCategoryResponse,
        success: true,
    });
    
}