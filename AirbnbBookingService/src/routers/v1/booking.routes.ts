
import express from 'express';
import { cancelBookingHandler, createBookingHandler, finalBookingHandler } from '../../controllers/booking.controller';



const bookingRouter = express.Router();

bookingRouter.post('/' ,createBookingHandler);
bookingRouter.post('/final', finalBookingHandler);
bookingRouter.delete('/:bookingId', cancelBookingHandler);

export default bookingRouter;