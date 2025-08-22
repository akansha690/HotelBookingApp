
import Booking from "../models/booking";

export const createBooking = async function(bookingData: any, t:any ){
    try {
        const response = await Booking.create(bookingData, {transaction:t});
        return response;
    } catch (error) {
        throw error;
    }
}
export const findBookingByIdempotencyKey = async function(Key: string){
    try {
        if(!Key){
            return null;
        }
        const booking = await Booking.findOne({
            where:{
                idempotencyKey:Key
            }
        });
        return booking || null;

        
    } catch (error) {
        throw error;
    }
}