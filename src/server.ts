/* eslint-disable no-console */
// eslint-disable-next-line prettier/prettier
import express from "express";
// eslint-disable-next-line prettier/prettier
import routes from "./routes";

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line prettier/prettier
  console.log(":) Server started on port 3333");
});
