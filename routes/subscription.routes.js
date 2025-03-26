import { Router } from "express";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";
import { Authorize } from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET subscription details' }))

subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET subscription details' }))

subscriptionRouter.post('/', Authorize, createSubscription)

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE subscriptions' }))

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscripition' }))

subscriptionRouter.get('/user/:id', Authorize, getUserSubscriptions)

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: 'cancel subscriptions' }))

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewals' }))

export default subscriptionRouter;
