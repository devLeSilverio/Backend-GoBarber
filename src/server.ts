/* eslint-disable no-console */
// eslint-disable-next-line prettier/prettier
import express from "express";
// eslint-disable-next-line prettier/prettier
import routes from "./routes";
import uploadConfig from './config/upload';
import './database';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

app.listen(3333, () => {
  console.log(':) Server started on port 3333');
});
