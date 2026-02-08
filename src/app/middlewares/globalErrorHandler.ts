import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ValidationError } from 'joi';
import ApiError from '../errors/ApiError';

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Default values
    let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong!';
    let errorDetails: any = null;
    let stack: string | undefined = undefined;

    // 1. Custom ApiError
    if (err instanceof ApiError) {
        statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        message = err.message || 'Operation failed';
    }

    // 2. Joi Validation Error
    else if (err instanceof ValidationError || err.isJoi) {
        statusCode = httpStatus.BAD_REQUEST;
        message = 'Validation failed';
        errorDetails = err.details?.map((d: any) => ({
            message: d.message,
            path: d.path?.join('.'),
            type: d.type,
        })) || err.message;
    }


    // 3. Other known errors 
    else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        statusCode = httpStatus.UNAUTHORIZED;
        message = 'Invalid or expired token';
    }

    // 4. Fallback for unknown errors
    else {
        message = err.message || 'Internal server error';
        if (process.env.NODE_ENV !== 'production') {
            errorDetails = err;
            stack = err.stack;
        }
    }

    // Logging (structured & useful)
    console.error('Global Error Handler:', {
        statusCode,
        message,
        method: req.method,
        path: req.originalUrl,
        errorName: err.name,
        errorMessage: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });

    const response: any = {
        success: false,
        message,
        statusCode,
    };

    if (process.env.NODE_ENV !== 'production' || err instanceof ApiError || err.isJoi) {
        response.error = errorDetails || err.message;
        if (stack) response.stack = stack;
    }

    res.status(statusCode).json(response);
};

export default globalErrorHandler;