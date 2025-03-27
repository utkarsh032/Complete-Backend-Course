import { Router } from "express";
import { setReminders } from "../controllers/workflow.controller.js";

const workFlowRouter = new Router()

workFlowRouter.post('/subscription/reminder', setReminders)

export default workFlowRouter