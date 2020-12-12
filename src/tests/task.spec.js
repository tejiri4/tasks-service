import app from 'src';
import crypto from "crypto";
import request from 'supertest';
import User from "models/user";
import Task from "models/task";
import testData from "tests/fixtures/testData"
import messages from "utils/messages"

describe('task', () => {
  const tasks = testData.tasks;
  let newTaskId;

  it('should return all user tasks',(done) => {
    const mock = jest.spyOn(Task, 'find');

    mock.mockImplementation(({ user_id }) => ({
        exec: () => tasks.filter(task => task.user_id === user_id )
    }));

    request(app)
			.get(`/v1/tasks/users/${testData.users[1]._id}`)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
			if (err) throw err;

			expect(res.body.length).toEqual(2)

			done()
    });
  });

  it('should return a single task',(done) => {
    const mock = jest.spyOn(Task, 'findById');

    mock.mockImplementation((id) => tasks.find(user => user._id === id));

      request(app)
      .get(`/v1/tasks/${tasks[0]._id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        const { _id, name } = res.body;

        expect(_id).toEqual(tasks[0]._id)
        expect(name).toEqual(tasks[0].name)
        done()
      });
  });

  it('should not return a single task with wrong id',(done) => {
    const mock = jest.spyOn(Task, 'findById');

    mock.mockImplementation((id) => tasks.find(user => user._id === id));

      request(app)
      .get(`/v1/tasks/5fd299a5342b1c417a253ce9`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) throw err;

        expect(res.body.message).toEqual(messages.taskNotFound)
        done()
      });
  });

  it('should create a new task',(done) => {
    const newTask = { user_id: "5fd30ccd9514265ca6a9ac8f", description: "Go to the school today."}

    const mockTask = jest.spyOn(Task, 'create');
		const mockUser = jest.spyOn(User, 'findById');

    mockUser.mockImplementation((id) => {
      return testData.users.find(user => user._id === id)
		});
		
    mockTask.mockImplementation(task => {
      const taskCreated = { ...task, _id: crypto.randomBytes(12).toString('hex') };

      tasks.push(taskCreated)

      return taskCreated;
    });

    request(app)
      .post(`/v1/tasks`)
      .expect('Content-Type', /json/)
      .send(newTask)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        const { description, _id } = res.body;

        newTaskId = _id;

        expect(description).toEqual("Go to the school today.")
        done()
      });
  });

  it('should not update a new user with wrong id',(done) => {
		const newTask = { state: "done" }

    const mock = jest.spyOn(Task, 'findById');

    mock.mockImplementation((id) => {
      return tasks.find(task => task._id === id)
    });

    request(app)
      .put(`/v1/tasks/5fd20ccd9514265ca6a9ac8f`)
      .expect('Content-Type', /json/)
      .send(newTask)
      .expect(400)
      .end(function(err, res) {
        if (err) throw err;

        expect(res.body.message).toEqual(messages.taskNotFound)
        done()
      });
  });

  it('should update a new task',(done) => {
		const newTask = { state: "done" }

    const mock = jest.spyOn(Task, 'findById');

    mock.mockImplementation((id) => {
      return {
        ...tasks.find(task => task._id === id),
        updateOne: jest.fn()
      }
    });

    request(app)
      .put(`/v1/tasks/${newTaskId}`)
      .expect('Content-Type', /json/)
      .send(newTask)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        const { message } = res.body;

        expect(message).toEqual(messages.taskUpdated)
        done()
      });
  });

  it('should not delete a task with wrong id',(done) => {
    const mock = jest.spyOn(Task, 'findById');

    mock.mockImplementation((id) => {
      return tasks.find(task => task._id === id)
    });

    request(app)
      .delete(`/v1/tasks/5fd20ccd9514265ca6a9ac8f`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) throw err;

        expect(res.body.message).toEqual(messages.taskNotFound)
        done()
      });
  });

  it('should delete a task',(done) => {
    const mock = jest.spyOn(Task, 'findById');

    mock.mockImplementation((id) => {
      return {
        ...tasks.find(task => task._id === id),
        deleteOne: jest.fn()
      }
    });

    request(app)
      .delete(`/v1/tasks/${newTaskId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        const { message } = res.body;

        expect(message).toEqual(messages.taskDeleted)
        done()
      });
  });
});