
import express from 'express';
import { createBookingHandler, finalBookingHandler } from '../../controllers/booking.controller';

const bookingRouter = express.Router();

bookingRouter.post('/', createBookingHandler);
bookingRouter.post('/final', finalBookingHandler);

export default bookingRouter;