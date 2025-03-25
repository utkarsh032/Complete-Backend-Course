import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import { Authorize } from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.get('/', getUsers)

userRouter.get('/:id', Authorize, getUser)

userRouter.post('/', (req, res) => res.send({ title: 'Create  New User' }))

userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE user' }))

userRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE user' }))

export default userRouter;