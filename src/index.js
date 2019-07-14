const express = require('express');
require('../src/db/mongoose');
const userRouter = require('../src/routers/user');
const taskRouter = require('../src/routers/task');
const Task = require('../src/models/task').Task;
const User = require('../src/models/user').User;
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer');
const upload = multer({
    dest: 'images'
})

app.post('/upload', upload.single('myUpload'), (req, res) => {
    res.send();
});



// parse http request body to json?
app.use(express.json());
app.use(userRouter.router);
app.use(taskRouter.router);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});