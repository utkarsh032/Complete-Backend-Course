import express from "express";
import { PORT } from './config/env.js'

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Subscription' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
})