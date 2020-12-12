import Joi from 'joi';

const idSchema = Joi.object({
   id: Joi.string().required()
});

const taskSchema = Joi.object({
    user_id: Joi.number().required(),
    description: Joi.string().required()
});

const updateTaskSchema = Joi.object({
	id: Joi.string().required(),
}).keys(
	{
		description: Joi.string(),
		state: Joi.string().valid('done')
	}
).or('description', 'state') // At least one of these keys must be in the object to be valid.
.required()

export { idSchema, taskSchema, updateTaskSchema };