import { Router } from "express";

const userRouter = Router()

userRouter.get('/', (req, res) => res.send({ title: 'Get All user' }))

userRouter.get('/:id', (req, res) => res.send({ title: 'Get User details' }))

userRouter.post('/', (req, res) => res.send({ title: 'Create  New User' }))

userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE user' }))

userRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE user'}))

export default userRouter;