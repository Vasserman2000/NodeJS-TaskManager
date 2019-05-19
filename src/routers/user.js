const express = require('express');
const User = require('../models/user').User;
const auth = require('../middleware/auth');
const router = new express.Router();


router.post('/users', async (req, res) => {
    const user = User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch(e) {
        res.status(400).send(e.message);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (e) {
         res.status(400).send(e.message);
    }
});

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});


router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});


router.patch('/users/:id', async (req, res) => {
    const allowedUpdates = ['name', 'age', 'password', 'email', 'isActive'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((prop) => allowedUpdates.includes(prop));
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid parameter!' });
    }

    try {
        
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const user = await User.findById(req.params.id);
        updates.forEach((update) => user[update] = req.body[update]);

        await user.save();

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});


router.delete('/users/:id', async (req, res) => {
    try {
        //const user = await User.findByIdAndDelete(req.params.id);
        const user = await User.findByIdAndUpdate(req.params.id, { isActive: 0 });
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = { router };