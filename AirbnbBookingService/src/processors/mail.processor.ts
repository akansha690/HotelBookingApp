
import { Worker } from "bullmq";
import { MAIL_PAYLOAD } from "../producers/mail.producer";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queues/email.queues";
import { getRedisConnection } from "../config/redis.config";

export const setUpWorkerMail = async()=>{

    const mailProcessor = new Worker<NotificationDto>(
        MAILER_QUEUE,
        async(job)=>{
            if(job.name !== MAIL_PAYLOAD){
                throw new Error("Invalid job name");
            }

            console.log(`payload is:  ${JSON.stringify(job.data)}` );
            
        },
        {
            connection : getRedisConnection()
            
        }
    )

    mailProcessor.on('completed' , ()=>{
        console.log(`Email processing completed`);
    })
    mailProcessor.on('failed' , ()=>{
        console.log(`Email processing failed`);
    })
    
}