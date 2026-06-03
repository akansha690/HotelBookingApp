import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";

export const appErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {

    console.log("ERROR:", err);

    res.status(err.statusCode).json({
        success: false,
        message: err.message || "Internal server error"
    });
}

export const genericErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("ERROR:", err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}