const express = require('express');
require('../src/db/mongoose');
const userRouter = require('../src/routers/user');
const taskRouter = require('../src/routers/task');


const app = express();

const port = process.env.PORT || 3000;

// parse http request body to json?
app.use(express.json());
app.use(userRouter.router);
app.use(taskRouter.router);


app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse');
    console.log(token);
}

myFunction();