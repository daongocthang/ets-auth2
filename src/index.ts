import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import authenticate from './mildwares/auth.mildware';
import { errorHandler } from './mildwares/error.mildware';
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

app.use('/users', authenticate, userRouter);

// Catch
app.use(errorHandler);
