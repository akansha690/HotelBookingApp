import { NextFunction, Request, Response } from "express";
import { cancelBooking, createBookingService, finalizeBookingService } from "../service/booking";
import {v4 as uuidv4} from 'uuid';
import { StatusCodes } from "http-status-codes";



export const createBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.header("X-User-ID"))
        if (!userId) {
            res.status(401).json({ error: "Unauthorized: missing user id" });
        }
        let data = {
            ...req.body,
            userId: userId
        }
        console.log("Req body", data);
        
        let key = req.header('Idempotency-key') || uuidv4();
        const createBooking = await createBookingService(data, key);
        if(createBooking){
            res.setHeader('Idempotency-key' , createBooking.idempotencyKey);
        }
        
        res.status(StatusCodes.OK).json({
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
        res.status(StatusCodes.OK).json({
            message: "Final Booking done successfully",
            data: finalBooking,
            success: true
        })
        
    } catch (error) {
        console.log(error);
        
    }
}


export const cancelBookingHandler = async (req: Request, res: Response, next: NextFunction)=>{
   
    const bookingId = Number(req.params.bookingId);
    await cancelBooking(bookingId);
    res.status(StatusCodes.OK).json({ message: "Booking cancelled successfully" });

}