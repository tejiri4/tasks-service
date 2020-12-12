import db from "models";
import messages from "utils/messages"

const createTask = async (req, res) => {
	try {
		// check if user exists
		const user = await db.User.findByPk(req.filtered.user_id);
		
		// check if user exist
		if(!user) return res.status(400).json({ message: messages.userNotFound });

		// create task
		const newTask = await db.Task.create({ ...req.filtered, state: 'todo' });

		return res.status(200).json(newTask)

	} catch (err) {
		return res.status(500).json({ error: messages.serverError });
	}
}

const getUserTasks = async (req, res) => {
	try {
		const { count, rows } = await db.Task.findAndCountAll({ where: { user_id: req.filtered.id } });
		
		return res.status(200).json({ count, tasks: rows})
	} catch(err) {
		return res.status(500).json({ message: messages.serverError });
	}
}

const updateTask = async (req,res) => {
	try {
		const task = await db.Task.findByPk(req.filtered.id);

		if(!task) return res.status(400).json({ message: messages.taskNotFound  });

		await task.update(req.body);

		return res.status(200).json({ message: messages.taskUpdated })
  } catch(err) {
		return res.status(500).json({ message: messages.serverError });
  }
}

const deleteTask = async (req, res) => {
	try {
		const task = await db.Task.findByPk(req.filtered.id);

		if(!task) return res.status(400).json({ message: messages.taskNotFound  });

		await task.destroy();

		return res.status(200).json({ message: messages.taskDeleted })
  } catch(err) {
		return res.status(500).json({ message: messages.serverError });
  }
}

const getTask = async (req, res) => {
	try {
		const task = await db.Task.findByPk(req.filtered.id);
		
		if(!task) return res.status(400).json({ message: messages.taskNotFound  });

		return res.status(200).json(task)
  } catch(err) {
		return res.status(500).json({ message: messages.serverError });
  }
}

export { createTask, getUserTasks, updateTask, deleteTask, getTask };