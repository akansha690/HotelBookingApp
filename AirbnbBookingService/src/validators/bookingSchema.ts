import { z } from "zod";
import { BookingStatus } from "../models/booking";

export const bookingSchema = z.object({
    userId: z.number(),
    hotelId: z.number(),
    bookingAmount: z.number().positive(), 
    status: z.nativeEnum(BookingStatus), 
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    idempotencyKey: z.string().uuid().optional(), 
    numberOfGuests: z.number().min(1),
    checkInDate : z.date(),
    checkOutDate: z.date(),
    bookingId: z.number()
})

