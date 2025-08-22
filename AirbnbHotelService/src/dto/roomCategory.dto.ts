import { RoomType } from "../db/models/roomCategory.model";

export type createRoomCategoryDTO= {
    hotelId: number;
    roomId: number
    roomCount:number,
    roomType : RoomType,
}