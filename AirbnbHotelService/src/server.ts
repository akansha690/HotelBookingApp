import express from 'express';
import { serverConfig } from './config/config';
import logger from './config/logger.config';
import { errorMiddleware } from './middlewares/error.middleware';
import { attachCorrelationIdMiddleware } from './middlewares/correlationId';
import v1Router from './routers/v1';

// const PORT : number = 3000;

const app= express();
app.use(express.json())

app.use(attachCorrelationIdMiddleware);

app.use('/api/v1', v1Router);

app.use(errorMiddleware);

app.listen(serverConfig.PORT,()=>{
    logger.info(`listening on PORT : ${serverConfig.PORT}`);
    // logger.error("something");
    
})


