import { Request, Response } from 'express';
import { BadRequestError } from '../middlewares/error.middleware';

export const getUser = (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        throw new BadRequestError('User not available');
    }

    res.status(200).json(user);
};
