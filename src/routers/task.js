const express = require('express');
const Task = require('../models/task').Task;
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/tasks', auth, (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    task.owner = req.user._id;

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(400).send(error);
    });
});


router.get('/tasks', (req, res) => {
    Task.find().then((tasks) => {
        res.send(tasks);
    }).catch((error) => {
        res.status(500).send(error.message);
    });
});

router.get('/tasks/:id', (req, res) => {
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


router.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((prop) => allowedUpdates.includes(prop)) && updates.length > 0;

    if (!isValidOperation) {
        return res.status(400).send({error: 'invalid input'});
    }

    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const task = await Task.findById(req.params.id);

        updates.forEach((update => task[update] =  req.body[update]));

        await task.save();

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);

    } catch (e) {
        res.status(400).send(e.message);
    }

});


router.delete('/tasks/:id', async (req, res) => {
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

module.exports = { router };