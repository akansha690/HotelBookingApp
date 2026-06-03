import axios from 'axios'
import {serverConfig} from '../config'


export async function getAllAvailableRooms(categoryId: number, checkInDate: Date, checkOutDate: Date){

    console.log(categoryId, checkInDate, checkOutDate)
        const response = await axios.get(`${serverConfig.HOTEL_API_URL}/categories/allrooms`, 
            {
                params:{
                    categoryId,
                    checkInDate,
                    checkOutDate
                }
            }
    ) 
    console.log("availableRooms response:", response.data);
    return response.data
}

export async function updateBookingIdOfRoom(bookingId:number, roomsId: number[]){
    const response = await axios.patch(`${serverConfig.HOTEL_API_URL}/rooms/update-booking-id`,null, {
        params:{
            bookingId,
            roomsId
        }
    })
    return response.data
}

export async function reUpdateBookingIdOfRoom(bookingId:number){
    const response = await axios.patch(`${serverConfig.HOTEL_API_URL}/rooms/reupdate-booking-id`, null, {
        params:{
            bookingId
        }
    })
    return response.data
}