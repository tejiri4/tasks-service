import express from 'express';
import validate from 'validations';
import { taskSchema, idSchema, updateTaskSchema } from 'validations/schemas';
import { createTask, getUserTasks, updateTask, deleteTask, getTask } from 'controllers/task';

const taskRouter = express.Router();

taskRouter.post('/', validate(taskSchema), createTask)
taskRouter.put('/:id', validate(updateTaskSchema), updateTask)
taskRouter.get('/:id',validate(idSchema), getTask)
taskRouter.delete('/:id', validate(idSchema), deleteTask)
taskRouter.get('/users/:id', validate(idSchema), getUserTasks)

export default taskRouter;