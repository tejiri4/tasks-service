import { Sequelize } from 'sequelize';
import config from 'config/database.js';

// models
import User from 'models/user';
import Task from 'models/task';

const env = process.env.NODE_ENV || 'development';

const { database, username, password, host, dialect, ...rest } = config[env];

const sequelize = new Sequelize({
  database,
  username,
  password,
  host,
  dialect,
  ...rest
});

const models = {
  User: User(sequelize, Sequelize),
  Task: Task(sequelize, Sequelize),
};

// For the future when we set up associations
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

const db = {
  ...models,
  sequelize,
  Sequelize
};

export default db;