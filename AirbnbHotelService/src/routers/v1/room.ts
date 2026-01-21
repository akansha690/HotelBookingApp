import express from 'express';
import { reqValidator } from '../../validators';
import { roomSchema } from '../../validators/roomSchema';
import { createRoomHandler, deleteRoomHandler, getRoomHandler, reUpdateRoomBookingIdHandler, roomAvailabilityHandler, updateRoomBookingId, updateRoomHandler } from '../../controllers/room.controller';



const roomRouter = express.Router();

roomRouter.post(
    '/categories/:categoryId/rooms/create', 
    reqValidator(roomSchema),
    createRoomHandler
);
roomRouter.get('/:id', getRoomHandler)
roomRouter.patch('/:id/update', updateRoomHandler)
roomRouter.delete('/:id/delete', deleteRoomHandler)
// roomRouter.patch('/:id/book', roomBookingHandler)

// for booking service -- axios http requests
roomRouter.get('/:id/availability', roomAvailabilityHandler)
roomRouter.patch('/update-booking-id', updateRoomBookingId)
roomRouter.patch('/reupdate-booking-id', reUpdateRoomBookingIdHandler)

export default roomRouter;