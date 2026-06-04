import { NextFunction, Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { asyncLocalStorage } from '../utils/helper/correlation.helper';

export const attachCorrelationIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Generate a unique correlation ID
    const correlationId = uuidV4(); // it identifies every request uniquely. 
    
    req.headers['x-correlation-id'] = correlationId;

    // Call the next middleware or route handler

    // to bind the correlationId with the current asynchronous context
    asyncLocalStorage.run( { correlationId: correlationId } , () => {
        next();
    });
}