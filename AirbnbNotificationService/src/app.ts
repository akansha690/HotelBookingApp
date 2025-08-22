
import express from 'express';
import { serverConfig } from './config/server.config';
import { setUpWorkerMail } from './processors/mail.processor';
// import { renderTemplate } from './renderTemplates/template.index';
// import { logger } from './config/logger.config';
// import { setUpWorkerMail } from './processors/mail.processor';
// import { NotificationDto } from './dtos/notification.dto';
import { sendMailToQueue } from './producers/mail.producer';

const app = express();

app.use(express.json());

app.listen(serverConfig.PORT, async() => {
   
   sendMailToQueue({
      to: 'akanshak972@gmail.com',
      subject: "Project details",
      templateId: 'welcome', 
      params:{
         name: "Akansha",
         appName : "Algocamp"
      }
   })
   setUpWorkerMail();
   
});
