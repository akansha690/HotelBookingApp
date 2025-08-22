import RoomCategory from "../db/models/roomCategory.model";

import BaseRepository from "./base.repository";


export class RoomCategoryRepository extends BaseRepository<RoomCategory>{
    constructor(){
        super(RoomCategory);
    }
    
    async getAllByHotelId(hotelId:number) {
        const categories = await this.model.findAll({
            where:{
                hotelId: hotelId,
                deletedAt: null
            }
        })
        if(!categories || categories.length === 0){
            return [];
        }
        return categories;
    }
    async softDelete(id:number){
        try {
            const roomCategory = await this.model.findByPk(id);
            if(!roomCategory){
                throw new Error("roomCategory is not found for deletion");
            }
            roomCategory.deletedAt = new Date();
            await roomCategory.save();
        } catch (error) {
            throw error;
        }
    }


}