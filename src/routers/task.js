const express = require('express');
const Task = require('../models/task').Task;
const router = new express.Router();
const auth = require('../middleware/auth');

// create task
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

// get all my tasks
router.get('/tasks', auth, async (req, res) => {
    try {
        const myTasks = await Task.find({owner: req.user._id});
        if (myTasks.length === 0) {
            return res.status(404).send('NO TASKS FOUND');
        }

        await myTasks.forEach(task => task.populate('owner', 'name').execPopulate());
        res.send(myTasks);    
    } catch(e) {
        res.status(500).send(e.message);
    }
});

// get taks by id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({_id, owner: req.user._id});
        
        if (!task) {
            return res.status(404).send('TASK NOT FOUND');
        }

        await task.populate('owner','name').execPopulate();

        res.send(task);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// update task
router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((prop) => allowedUpdates.includes(prop)) && updates.length > 0;

    if (!isValidOperation) {
        return res.status(400).send({error: 'invalid input'});
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update => task[update] =  req.body[update]));

        await task.save();

        res.send(task);

    } catch (e) {
        res.status(400).send(e.message);
    }
});

// delete task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!task) {
            return res.status(404).send('A task with provided ID has not been found or you are not it\'s owner');
        }

        res.send(task);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = { router };