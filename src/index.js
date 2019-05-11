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

const bcrypt = require('bcryptjs')
const myFunction = async () => {
    const password = 'Red12345!';
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log('Plain text password: ' + password)
    console.log('Hashed password: ' + hashedPassword)

    console.log('Is the password correct: ' + await bcrypt.compare('Red12345!', hashedPassword))
}

myFunction();