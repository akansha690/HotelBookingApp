import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/error";

export const errorMiddleware =(err:AppError, req:Request, res:Response, next:NextFunction) =>{
    res.status(err.statusCode).json({
        message: err.message,
        success:false
    })
    next();
}