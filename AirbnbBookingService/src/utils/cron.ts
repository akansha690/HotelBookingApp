// utils/cron.ts
import cron from "node-cron";
import Booking, { BookingStatus } from "../models/booking";
import { reUpdateBookingIdOfRoom } from "../gateway/hotel.api";
import { Op } from "sequelize";

// ── Daily cleanup — cancel PENDING + BOOKED where checkIn date has passed ──
cron.schedule("0 0 * * *", async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const staleBookings = await Booking.findAll({
      where: {
        status: {
          [Op.in]: [BookingStatus.PENDING, BookingStatus.BOOKED]
        },
        checkInDate: {
          [Op.lt]: today
        }
      }
    });

    console.log(`DAILY CRON: ${staleBookings.length} stale bookings to cancel`);

    for (const booking of staleBookings) {
      await reUpdateBookingIdOfRoom(booking.id);
      booking.status = BookingStatus.CANCELLED;
      await booking.save();
      console.log(`Booking ${booking.id} cancelled — checkIn ${booking.checkInDate} has passed`);
    }

  } catch (error) {
    console.log("DAILY CRON ERROR:", error);
  }
});