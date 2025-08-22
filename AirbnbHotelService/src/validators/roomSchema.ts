
import {z} from 'zod';

export const roomSchema = z.object({
    hotelId : z.number(),
    roomCategoryId : z.number(),
    price : z.number(),
    dateOfAvailability : z.string().transform((val) => new Date(val)),
    bookingId : z.number().nullable(),
});


