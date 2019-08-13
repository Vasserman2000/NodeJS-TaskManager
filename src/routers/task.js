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

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    try {
        const match = {};
        const sort = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }

        //console.log(parseInt(req.query.limit))
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();

        if (req.user.tasks.length === 0) {
            return res.status(404).send('NO TASKS FOUND');
        }

        res.send(req.user.tasks);    
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
        //console.log('... ' + task);
        if (!task) {
            return res.status(404).send('A task with provided ID has not been found or you are not it\'s owner');
        }

        res.send(task);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = { router };