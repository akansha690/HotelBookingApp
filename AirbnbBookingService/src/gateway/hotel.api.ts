import axios from 'axios'
import {serverConfig} from '../config'


export async function getAllAvailableRooms(categoryId: number, checkInDate: Date, checkOutDate: Date){

        const response = await axios.get(`${serverConfig.HOTEL_API_URL}/hotels/categories/rooms`, 
            {
                params:{
                    categoryId,
                    checkInDate,
                    checkOutDate
                }
            }
    ) 

    return response.data
}

export async function updateBookingIdOfRoom(bookingId:number, roomsId: number[]){
    const response = await axios.patch(`${serverConfig.HOTEL_API_URL}/update-booking-id`, {
        params:{
            bookingId,
            roomsId
        }
    })
    return response.data
}