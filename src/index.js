const express = require('express');
require('../src/db/mongoose');
const User = require('../src/models/user').User;
const Task = require('../src/models/task').Task;


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

app.get('/tasks', (req, res) => {
    Task.find().then((tasks) => {
        res.send(tasks);
    }).catch((error) => {
        res.status(500).send(error.message);
    });
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    }).catch((error) => {
        res.status(500).send();
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

