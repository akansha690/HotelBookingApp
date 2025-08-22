import express from 'express';
import { createHotelHandler, deleteHotelHandler, getAllHotelsHandler, getHotelByIdHandler, litsAllRoomsOfHotelHandler, updateHotelHandler } from '../../controllers/hotel.controller';
import { reqValidator } from '../../validators';
import { hotelSchema } from '../../validators/hotelSchema';


const hotelRouter = express.Router();

hotelRouter.post(
    '/', 
    reqValidator(hotelSchema),
    createHotelHandler); 

hotelRouter.get('/:id', getHotelByIdHandler); 

hotelRouter.get('/', getAllHotelsHandler);

hotelRouter.delete('/:id', deleteHotelHandler);

hotelRouter.patch('/:id', updateHotelHandler);

hotelRouter.get('/:hotelId/rooms/available', litsAllRoomsOfHotelHandler);


export default hotelRouter;