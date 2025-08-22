import { BookingStatus } from "../models/booking"


export type booking= {
    // id?: number
    userId: number,
    hotelId: number,
    bookingAmount: number,
    checkInDate:Date,
    checkOutDate:Date,
    idempotencyKey?: string
    numberOfGuests:number,
    categoryId:number,
    bookingId: number
    createdAt?:Date,
    updatedAt?:Date,
    deletedAt?:Date,
    status?:BookingStatus
}

export type updateRoomDTO ={
    id: number,
    categoryId:number,
    dateOfAvailability:Date
}
