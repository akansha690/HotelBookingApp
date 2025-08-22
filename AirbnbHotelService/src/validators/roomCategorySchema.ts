import {z} from 'zod';

export const roomCategorySchema = z.object({
    hotelId : z.number(),
    roomId : z.number(),
    roomCount : z.number(),
    roomType : z.enum(['SINGLE', 'DOUBLE', 'SUITE', 'FAMILY', 'DELUXE'])
});

