
import {  NextFunction, Request, Response} from 'express';
import { ZodSchema  } from 'zod';
import logger from '../config/logger.config';

export const reqValidator = function(schema : ZodSchema ) {
    return async(req:Request , res:Response , next: NextFunction)=>{
        try {
            logger.info("Validating Request Object")
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            logger.error("Request body is invalid")
            res.status(404).json({
                message:"incorrect request body"
            })
        }
    }
}