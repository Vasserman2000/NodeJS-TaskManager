const express = require('express');
require('../src/db/mongoose');
const userRouter = require('../src/routers/user')


const app = express();

const port = process.env.PORT || 3000;

// parse http request body to json?
app.use(express.json());
app.use(userRouter.router);


app.post('/tasks', (req, res) => {
    const task = Task.Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(400).send(error);
    });
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


app.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((prop) => allowedUpdates.includes(prop)) && updates.length > 0;

    console.log(isValidOperation + ', updates: ' + updates.length)

    if (!isValidOperation) {
        return res.status(400).send({error: 'invalid input'});
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);

    } catch (e) {
        res.status(400).send(e.message);
    }

});


app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send('A task with provided ID has not found');
        }

        res.send(task);
    } catch(e) {
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

