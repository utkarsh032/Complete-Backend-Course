import express from "express";
import { PORT } from './config/env.js'
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongoDB.js";

const app = express();

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subcriptions', subscriptionRouter)

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Subscription API' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)

  connectToDatabase()
})