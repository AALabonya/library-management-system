import { NextFunction, Request, Response } from "express";

function globalErrorHandler(error: any, _req: Request, res: Response, _next: NextFunction) {
    console.log(error);
    res.status(error.status || 500).json({
        success: false,
        statusCode: 500,
        message: error.message || 'Something went wrong',
        error
    })
};

export default globalErrorHandler