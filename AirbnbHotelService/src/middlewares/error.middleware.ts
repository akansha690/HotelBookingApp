import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/error";

export const errorMiddleware =(err:AppError, req:Request, res:Response, next:NextFunction) =>{
     console.log(" FULL ERROR:", err);
    res.status(err.statusCode).json({
        message: err.message || "Internal Server Error",
        success:false,
        error: err
    })
    next();
}

