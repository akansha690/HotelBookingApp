import { NotificationDto } from "../dto/notification.dto";
import { mailerQueue } from "../queues/email.queues";


export const MAIL_PAYLOAD = "mail:payload";

export  const sendMailToQueue = async(payload : NotificationDto)=>{
    await mailerQueue.add(MAIL_PAYLOAD, payload );
    console.log(`Added mail to queue ${JSON.stringify(payload)}`)
}