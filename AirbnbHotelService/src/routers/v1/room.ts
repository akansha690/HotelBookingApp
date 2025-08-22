import express from 'express';
import { reqValidator } from '../../validators';
import { roomSchema } from '../../validators/roomSchema';
import { createRoomHandler, deleteRoomHandler, getRoomHandler, roomAvailabilityHandler, roomBookingHandler, updateRoomBookingId, updateRoomHandler } from '../../controllers/room.controller';



const roomRouter = express.Router();

roomRouter.post(
    '/categories/:categoryId/rooms/create', 
    reqValidator(roomSchema),
    createRoomHandler
);
roomRouter.get('/rooms/:id', getRoomHandler)
roomRouter.patch('/rooms/:id/update', updateRoomHandler)
roomRouter.delete('/rooms/:id/delete', deleteRoomHandler)
roomRouter.get('/rooms/:id/availability', roomAvailabilityHandler)
roomRouter.post('/rooms/:id/book', roomBookingHandler)
roomRouter.patch('/update-booking-id', updateRoomBookingId)

export default roomRouter;