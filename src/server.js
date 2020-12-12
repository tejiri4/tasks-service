import { sequelize } from 'models';
import dotenv from 'dotenv';
import app from 'src';

// read variables from .env file
dotenv.config();

// set default to 3000
const port = process.env.PORT || 3000; 

sequelize.authenticate().then(() => app.listen(port, () => console.log('App listerning on port ' + port)))
.catch(err => console.log(err))