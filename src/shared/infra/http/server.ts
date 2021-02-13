/* eslint-disable no-console */
// eslint-disable-next-line prettier/prettier
import express, {Request, Response,NextFunction} from "express";
import 'express-async-errors';
// eslint-disable-next-line prettier/prettier
import uploadConfig from '@config/upload'
import routes from '@shared/infra/http/routes';
import '@shared/infra/typeorm';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log(':) Server started on port 3333');
});