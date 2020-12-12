import express from 'express';
import taskRouter from "routes/v1/task";

const v1Router = express.Router();

v1Router.use('/tasks', taskRouter)

export default v1Router;
