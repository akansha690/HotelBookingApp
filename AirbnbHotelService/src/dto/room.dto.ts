export type createRoomDTO = {
    hotelId: number;
    dateOfAvailability: Date;
    price: number;
    roomNo:number
}

export type updateBookingIdRoomDTO = {
    roomsId: number[]
    bookingId: number;
}
