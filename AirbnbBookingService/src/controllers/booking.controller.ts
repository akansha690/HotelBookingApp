import { NextFunction, Request, Response } from "express";
import { createBookingService, finalizeBookingService } from "../service/booking";
import {v4 as uuidv4} from 'uuid';
// import { StatusCodes } from "http-status-codes";



export const createBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        let key = req.header('Idempotency-key') || uuidv4();
        const createBooking = await createBookingService(req.body, key);
        res.setHeader('Idempotency-key' , createBooking.idempotencyKey);
        
        res.json({
            message: "Booking created successfully",
            data: createBooking,
            success: true
        })
    } catch (error) {
        throw error;
    }
}


export const finalBookingHandler = async (req: Request, res: Response, next: NextFunction) =>  {
    try {
        const key = req.header("Idempotency-key");
        if (!key) {
            res.json({
                message: "Idempotency key is missing",
                success: false
            });
            return;
        }
        
        const finalBooking = await finalizeBookingService(req.body, key);
        res.json({
            message: "Final Booking done successfully",
            data: finalBooking,
            success: true
        })
        
    } catch (error) {
        throw new Error("Idempotency key is missing");
    }
}
