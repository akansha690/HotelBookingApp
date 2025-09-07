


export type booking= {
    // userId: number,
    hotelId: number,
    checkInDate:string,
    checkOutDate:string,
    numberOfGuests:number,
    categoryId:number,
}

export type updateRoomDTO ={
    id: number,
    categoryId:number,
    dateOfAvailability:Date
}
