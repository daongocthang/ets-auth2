import { Request, Response } from 'express';
import { userService } from '../db/services';
import { AuthenticationError } from '../middlewares/error.middleware';
import { authUtil } from '../utils';

export const signIn = async (req: Request, res: Response) => {
    const { username } = req.body;
    const user = await userService.findOne({ name: username });
    if (!user) {
        throw new AuthenticationError('User not found');
    }

    authUtil.generateToken(res, { id: user.id });
    res.status(201).json({
        id: user.id,
        name: user.name,
    });
};

export const signOut = async (req: Request, res: Response) => {
    authUtil.clearToken(res);
    res.status(200).json({ message: 'Successfully sign out' });
};
