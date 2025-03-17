import { Router } from "express";

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all subscriptions' }))

subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET subscription details' }))

subscriptionRouter.post('/', (req, res) => res.send({ title: 'CREATE subscriptions' }))

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE subscriptions' }))

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscripition' }))

subscriptionRouter.get('/user/:id', (req, res) => res.send({ title: 'GET all user subsripitions' }))

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: 'cancel subscriptions' }))

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewals' }))

export default subscriptionRouter;
