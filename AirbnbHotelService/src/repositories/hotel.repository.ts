import Hotel from "../db/models/hotel.model";
import BaseRepository from "./base.repository";


export class HotelRepository extends BaseRepository<Hotel>{

    constructor(){
        super(Hotel);
    }

    async findAll(){
        try {
            const hotels = await this.model.findAll({
                where:{
                    deletedAt:null
                }
            });
            if(!hotels){
                return [];
            }
            return hotels;
        } catch (error) {
            throw error;
        }
    }
    async softDelete(id:number){
        try {
            const hotel = await this.model.findByPk(id);
            if(!hotel){
                throw new Error("This hotel is not found for deletion");
            }
            hotel.deletedAt = new Date();
            await hotel.save();
        } catch (error) {
            throw error;
        }
    }
    
}