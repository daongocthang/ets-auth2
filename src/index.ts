import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import { errorHandler } from "./mildwares/error.mildware";
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

const port: number = parseInt(process.env.NODE_PORT as string) || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Catch
app.use(errorHandler);
