import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';
import 'express-async-errors';

import createConnection from '@shared/infra/typeorm';
import swaggerFile from '../../../swagger.json';
import '@shared/container';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

process.env.TZ = 'America / Sao_Paulo';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    errorHandler(err, request, response, next);
  },
);

app.get('/', (request, response) => {
  return response.json({
    apiName: 'Pulse - Desafio Fullstack',
    version: '1.0.0',
  });
});

export { app };
