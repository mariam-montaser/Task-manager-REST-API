const express = require('express');

require('./db/mongoose');

const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Task App.');
})

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);


module.exports = app;