import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import { verifyToken } from "../utils/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";


export const checkAuth = () => async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;

        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        else if (req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
        }

        if (!token) {
            throw new ApiError(
                httpStatus.UNAUTHORIZED,
                "Only logged in users can access this route."
            )
        }

        const verifiedToken = verifyToken(token, config.jwt.secret as string) as JwtPayload;

        req.user = verifiedToken
        next()

    } catch (error) {
        next(error)
    }
}