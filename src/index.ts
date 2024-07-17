import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import 'express-async-errors';
import dbInit from './db';
import authenticate from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.middleware';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
dotenv.config();

type User = {
    id: number;
    name: string;
};

declare global {
    namespace Express {
        interface Request {
            user?: User | null;
        }
    }
}

const app: Application = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

const port: number = parseInt(process.env.NODE_PORT as string) || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
app.use('/api/v1/auth', authRouter);
app.use('/users', authenticate, userRouter);

// Exceotion Midleware
app.use(errorHandler);

dbInit();
