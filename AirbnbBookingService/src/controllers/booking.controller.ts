import { NextFunction, Request, Response } from "express";
import { cancelBooking, createBookingService, finalizeBookingService, getMyBookingsService } from "../service/booking";
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";

export const createBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.header("X-User-ID"));
        console.log("USER HEADER:", req.header("X-User-ID"));

        if (!userId) {
            res.status(401).json({ error: "Unauthorized: missing user id" });
            return;
        }

        let data = { ...req.body, userId };
        console.log("Req body", data);

        let key = req.header('Idempotency-key') || uuidv4();
        const createBookingResult = await createBookingService(data, key);

        if (createBookingResult) {
            res.setHeader('Idempotency-key', createBookingResult.idempotencyKey);
        }

        res.status(StatusCodes.OK).json({
            message: "Booking created successfully",
            data: createBookingResult,
            success: true
        });

    } catch (error: any) {
        console.log(error);
        if (error.statusCode) {
            res.status(error.statusCode).json({
                message: error.message,
                success: false
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const finalBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = req.header("Idempotency-Key");

        if (!key) {
            res.status(400).json({ message: "Missing idempotency key", success: false });
            return;
        }

        const result = await finalizeBookingService(req.body, key);

        res.status(200).json({
            message: "Booking finalized successfully",
            data: result,
            success: true
        });

    } catch (error: any) {
        console.log(error);
        if (error.statusCode) {
            res.status(error.statusCode).json({
                message: error.message,
                success: false
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getMyBookingsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.header("X-User-ID"));
        const bookings = await getMyBookingsService(userId);
        res.status(200).json({ success: true, data: bookings });
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const cancelBookingHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = Number(req.params.bookingId);
        const result = await cancelBooking(bookingId);
        res.status(200).json({
            message: "Booking cancelled successfully",
            data: result,
            success: true
        });
    } catch (error: any) {
        if (error.statusCode) {
            res.status(error.statusCode).json({
                message: error.message,
                success: false
            });
            return;
        }
        res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        });
    }
};