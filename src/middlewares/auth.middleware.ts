import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userService } from '../db/services';
import { AuthenticationError } from './error.middleware';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        throw new AuthenticationError('Token not found');
    }

    const jwtSecret = process.env.JWT_SECRET || '';
    const decode = jwt.verify(token, jwtSecret) as JwtPayload;
    console.log(decode.payload);

    if (!decode || !decode.id) {
        throw new AuthenticationError('UserId not found');
    }

    const user = await userService.findOne({ id: decode.id });
    if (!user) {
        throw new AuthenticationError('User not found');
    }
    req.user = user;
    next();
};

export default authenticate;
