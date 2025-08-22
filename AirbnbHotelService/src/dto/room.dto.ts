export type createRoomDTO = {
    hotelId: number;
    roomCategoryId: number;
    dateOfAvailability: Date;
    price: number;
    bookingId?: number | null;
}

export type updateBookingIdRoomDTO = {
    roomsId: number[]
    bookingId: number;
}
