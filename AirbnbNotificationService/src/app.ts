
import express from 'express';
import { serverConfig } from './config/server.config';
import { setUpWorkerMail } from './processors/mail.processor';
// import { sendMailToQueue } from './producers/mail.producer';

const app = express();

app.use(express.json());

app.listen(serverConfig.PORT, async() => {
   
   // sendMailToQueue({
   //    to: 'akanshak972@gmail.com',
   //    subject: "Project details",
   //    body : `Hey, Thanks for booking with Airbnb welcome!!!` 
   // })
   setUpWorkerMail();
   
});
