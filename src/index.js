const express = require('express');
require('../src/db/mongoose');
const User = require('../src/models/user').User;
const Task = require('../src/models/task');


const app = express();

const port = process.env.PORT || 3000;

// parse http request body to json?
app.use(express.json());

app.post('/users', (req, res) => {
    const user = User.User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.post('/tasks', (req, res) => {
    const task = Task.Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500).send(error);
    })
});

app.get('/users/:id', (req, res) => {

    User.findById(req.params.id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
        
    }).catch((error) => {
        res.status(500).send(error);
    })
});


app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

