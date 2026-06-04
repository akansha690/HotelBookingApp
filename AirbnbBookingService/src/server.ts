import express from 'express';
import { serverConfig } from './config';
import v1Router from './routers/v1/index.router';
import v2Router from './routers/v2/index.router';
import { appErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
// import { NotificationDto } from './dto/notification.dto';
// import { sendMailToQueue } from './producers/mail.producer';
import "./utils/cron"

const app = express();

app.use(express.json());

/**
 * Registering all the routers and their corresponding routes with out app server object.
 */

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router); 


/**
 * Add the error handler middleware
 */

app.use(appErrorHandler);

app.listen(serverConfig.PORT, async() => {
    logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
    logger.info(`Press Ctrl+C to stop the server.`);

   // const notification : NotificationDto={
   //    to : "John booking",
   //    subject: "Dev Project",
   //    body : `Hey, Thanks for booking with Airbnb welcome!!!`
   // }

   // sendMailToQueue(notification);
//    setUpWorkerMail();
    
});
