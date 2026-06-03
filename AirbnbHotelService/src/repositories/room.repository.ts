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

    async findByCategory(roomTypeId: number, checkInDate: string, checkOutDate: string) {
    return await this.model.findAll({
        where: {
            roomTypeId: roomTypeId,
            bookingId: null,
            dateOfAvailability: {
                [Op.lte]: checkInDate   
            }
        }
    });
}

    async getRoomsByCategory(roomTypeId: number) {

        return await this.model.findAll({
            where: {
                roomTypeId: roomTypeId
            }
        });

    }


    async findByHotel(hotelId: number) {
        return await this.model.findAll({
            where: {
                hotelId:hotelId,
                deletedAt: null
            }
        }); 
    }

    async updateBookingId(bookingId: number, roomsId:number[]){
        let allRooms = await this.model.findAll(
            {
                where:{
                    id:roomsId    //Sequelize automatically translates array into an SQL IN query.
                } 
            }
        )
        for(let room of allRooms){
            room.bookingId = bookingId
            await room.save()
        }
        return allRooms

    }

    async reupdateBookingId(bookingId: number){
        let rooms = await this.model.findAll(
            {
                where:{
                    bookingId
                }
            }
        ) 
        for(let room of rooms){
            room.bookingId = null;
            await room.save();
        }
        return rooms;
        
    }
}