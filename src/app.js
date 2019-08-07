const express = require('express');
require('../src/db/mongoose');
const userRouter = require('../src/routers/user');
const taskRouter = require('../src/routers/task');

const app = express();

app.use(express.json());
app.use(userRouter.router);
app.use(taskRouter.router);

module.exports = app;