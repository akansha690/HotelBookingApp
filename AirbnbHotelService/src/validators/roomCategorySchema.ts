import {z} from 'zod';

export const roomCategorySchema = z.object({
    roomCount : z.number(),
    roomType : z.enum(['SINGLE', 'DOUBLE', 'SUITE', 'FAMILY', 'DELUXE'])
});

