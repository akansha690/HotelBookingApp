
import Booking from "../models/booking";

export const createBooking = async function(bookingData: any){
    try {
        const response = await Booking.create(bookingData);
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

export const deleteBooking = async function(_id: number){
    try {
        await Booking.destroy({
            where:{
                id: _id
            }
        })
    } catch (error) {
        throw new Error("Booking not deleted")
    }
}