import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BlurbController from '../database/controllers';

// Server Setup
const app = express();
const appRouter = express.Router();
const PORT = 3000;

// Token import
dotenv.config();
const MONGO_TOKEN = process.env.MONGO;

// Mongoose Connection
mongoose.connect(String(MONGO_TOKEN));
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// App Structure
// app.get('/', (_req: Request, res: Response) => {
//   return res
//     .status(200)
//     .sendFile(path.resolve(import.meta.dirname, 'index.html'));
// });

// Routes
app.use('/', appRouter);

appRouter.get('/', BlurbController.getBlurb, (_req: Request, res: Response) => {
  return res.status(200).json(res.locals.blurbs);
});

appRouter.post('/', BlurbController.createBlurb, (_req: Request, res: Response) => {
  return res.status(200).json(res.locals.newBlurb);
});

// 404 Error Handler
app.use((_req: Request, res: Response) => {
  return res.sendStatus(404).send('Page not found.');
});

// Global Error Handler
interface Error {
  log: string;
  status: number;
  message: { err: string };
}

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Initialization
app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}...`);
});
