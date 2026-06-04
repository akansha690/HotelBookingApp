
import express from 'express';
import { cancelBookingHandler, createBookingHandler, finalBookingHandler, getMyBookingsHandler } from '../../controllers/booking.controller';



const bookingRouter = express.Router();
/* ---------------- CREATE BOOKING ---------------- */
bookingRouter.post("/", createBookingHandler);

bookingRouter.get(
  "/my-bookings",
  getMyBookingsHandler
);

/* ---------------- FINALIZE BOOKING ---------------- */
bookingRouter.post("/final", finalBookingHandler);

/* ---------------- CANCEL BOOKING ---------------- */
bookingRouter.delete("/:bookingId", cancelBookingHandler);

export default bookingRouter;