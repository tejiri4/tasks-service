import express from 'express';
import v1Router from 'routes';
import cors from 'cors';

// the main app
const app = express() 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// handle all error
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      message: err.message
    });
  }
  return next();
});

app.use('/v1', v1Router)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Tasks Service.'
  }) 
})

// handles route not found
app.all('*', (req, res) => {
  res.status(400).json({
    message: 'Route not found.'
  }) 
})

export default app;