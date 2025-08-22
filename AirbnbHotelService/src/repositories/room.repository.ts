import { Op } from "sequelize";
import Room from "../db/models/room.model";
import BaseRepository from "./base.repository";

export class RoomRepository extends BaseRepository<Room> {
    constructor(){
        super(Room);
    }
    async softDelete(id: number) {
        try {
            const room = await this.model.findByPk(id);
            if (!room) {
                throw new Error("Room not found for deletion");
            }
            room.deletedAt = new Date();
            await room.save();
        } catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const rooms = await this.model.findAll({
                where: {
                    deletedAt: null
                }
            });
            if (!rooms) {
                return [];
            }
            return rooms;
        } catch (error) {
            throw error;
        }
    }

    async findByCategory(roomTypeId: number, checkInDate:Date, checkOutDate:Date) {
        return this.model.findAll({
            where: {
                roomTypeId:roomTypeId,
                bookingId: null,
                dateOfAvailability:{
                    [Op.between] : [checkInDate , checkOutDate]
                }
            }
        }); 
    }

    async findByHotel(hotelId: number) {
        return this.model.findAll({
            where: {
                hotelId:hotelId,
                deletedAt: null
            }
        }); 
    }

    async updateBookingId(bookingId: number, roomsId:number[]){
        return this.model.update(
            {
                bookingId:bookingId
            },
            {
                where:{
                    id: roomsId       //Sequelize automatically translates array into an SQL IN query.
                    
                }
            }
        )
    }
}