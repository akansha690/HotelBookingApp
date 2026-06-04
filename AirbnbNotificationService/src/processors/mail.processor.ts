
import { Worker } from "bullmq";
import { NotificationDto } from "../dtos/notification.dto";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { MAIL_PAYLOAD } from "../producers/mail.producer";
import { connectRedisObject } from "../config/redis.config";
import { sendEmail } from "../services/mailer.services";

export const setUpWorkerMail = async()=>{

    const mailProcessor = new Worker<NotificationDto>(
        MAILER_QUEUE,
        async(job)=>{
            if(job.name !== MAIL_PAYLOAD){
                throw new Error("Invalid job name");
            }

            console.log(`payload is:  ${JSON.stringify(job.data)}` );
            const payload= job.data;
            const content = payload.body;
            await sendEmail(payload.to, payload.subject, content);
            
        },
        {
            connection : connectRedisObject()
            
        }
    )

    mailProcessor.on('completed' , ()=>{
        console.log(`Email processing completed`);
    })
    mailProcessor.on('failed' , ()=>{
        console.log(`Email processing failed`);
    })
    
}