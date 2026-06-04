import { z } from "zod";
import { BookingStatus } from "../models/booking";

export const bookingSchema = z.object({
    // userId: z.number(),
    hotelId: z.number(),
    bookingAmount: z.number().positive().optional(), 
    status: z.nativeEnum(BookingStatus).optional(), 
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    idempotencyKey: z.string().uuid().optional(), 
    numberOfGuests: z.number().min(1),
    checkInDate: z.string().transform((val) => new Date(val)),
    checkOutDate: z.string().transform((val) => new Date(val)),
    bookingId: z.number().nullable().optional(),
    categoryId : z.number()
})

