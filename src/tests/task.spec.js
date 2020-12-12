import app from 'src';
import request from 'supertest';
import db from "models";
import messages from "utils/messages"

describe('task', () => {
  const newTask = { user_id: 1, description: "Go to the school today."}

  let newTaskId;

  beforeAll(async() => {
    await db.sequelize.authenticate()
  })

  it('should create a new task',(done) => {
    request(app)
      .post(`/v1/tasks`)
      .expect('Content-Type', /json/)
      .send(newTask)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        const { description, id } = res.body;

        newTaskId = id;

        expect(description).toEqual("Go to the school today.")
        done()
      });
  });


  it('should return all user tasks',(done) => {
    request(app)
			.get("/v1/tasks/users/1")
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
			if (err) throw err;

			expect(res.body.count).toEqual(1)

			done()
    });
  });

  it('should return a single task',(done) => {
      request(app)
      .get(`/v1/tasks/${newTaskId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;

        const {id, description } = res.body;

        expect(id).toEqual(newTaskId)
        expect(description).toEqual(newTask.description)
        done()
      });
  });

  it('should not return a single task with wrong id',(done) => {
      request(app)
      .get(`/v1/tasks/4`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) throw err;

        expect(res.body.message).toEqual(messages.taskNotFound)
        done()
      });
  });

  it('should not update a new user with wrong id',(done) => {
    const newTask = { state: "done" }
    
    request(app)
      .put(`/v1/tasks/4`)
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
    request(app)
      .delete(`/v1/tasks/6`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) throw err;

        expect(res.body.message).toEqual(messages.taskNotFound)
        done()
      });
  });

  it('should delete a task',(done) => {
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