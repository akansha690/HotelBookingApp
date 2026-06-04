import { RoomType } from "../db/models/roomCategory.model";

export type createRoomCategoryDTO= {
    roomCount:number,
    roomType : RoomType,   

}