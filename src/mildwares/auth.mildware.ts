import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userService } from '../db/services';
import { AuthenticationError } from './error.mildware';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            throw new AuthenticationError('Token not found');
        }

        const jwtSecret = process.env.JWT_SECRET || '';
        const decode = jwt.verify(token, jwtSecret) as JwtPayload;
        if (!decode || !decode.payload) {
            throw new AuthenticationError('UserId not found');
        }

        const user = await userService.findOne({ id: decode.payload });
        if (!user) {
            throw new AuthenticationError('User not found');
        }
        req.user = user;
        next();
    } catch (e) {
        throw new AuthenticationError('Invalid token');
    }
};

export default authenticate;
