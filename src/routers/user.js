const express = require('express');
const User = require('../models/user').User;
const auth = require('../middleware/auth');
const router = new express.Router();


// Sign Up
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


// Log In
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (e) {
         res.status(400).send(e.message);
    }
});


// Log Out
router.post('/users/logout', auth, async (req, res) => {
    try {
        console.log(req.user.tokens)

        // remove current token (using the 'filter' function)
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });
        console.log(req.user.tokens)

        await req.user.save();

        res.send('You have successfully logged out!');
    } catch (e) {
        res.status(500);
    }
});


// Log out from all devices
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();
        
        res.send('Logged out from all devices');
    } catch (e) {
        res.status(500);
    }
});


// View My Profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
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


router.delete('/users/:id', auth, async (req, res) => {
    try {
        //const user = await User.findByIdAndDelete(req.params.id);

        //const user = await User.findByIdAndUpdate(req.params.id, { isActive: 0 });

        console.log(req.user.isActive);

        req.user.isActive = 0;

        console.log(req.user.isActive);
        console.log(req.user);

        await req.user.save();

        // if (!user) {
        //     return res.status(404).send();
        // }

        res.send(req.user);
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = { router };