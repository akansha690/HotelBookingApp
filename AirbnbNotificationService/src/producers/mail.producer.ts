import { mailerQueue } from "../queues/mailer.queue";
import { NotificationDto } from "../dtos/notification.dto";

export const MAIL_PAYLOAD = "mail:payload";

export  const sendMailToQueue = async(payload : NotificationDto)=>{
    await mailerQueue.add(MAIL_PAYLOAD, payload );
    console.log(`Added mail to queue ${JSON.stringify(payload)}`)
}