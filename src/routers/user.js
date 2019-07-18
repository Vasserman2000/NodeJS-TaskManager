const express = require('express');
const User = require('../models/user').User;
const auth = require('../middleware/auth');
const router = new express.Router();
const multer = require('multer');


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


// Edit profile
router.patch('/users/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'age', 'password', 'email', 'isActive'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((prop) => allowedUpdates.includes(prop));
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid parameter!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);

        await req.user.save();

        res.send(req.user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Delete profile
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();

        res.send(req.user);
    } catch(e) {
        res.status(500).send(e.message);
    }
});


const avatarUpload = multer({
    //dest: 'images/me/avatar',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('You are allowed to upload only files with extensions: jpg, jpeg, png'), false);
        }
        return cb(undefined, true);
    }
});

// My avatar
router.post('/users/me/avatar', auth, avatarUpload.single('myAvatar'), async (req, res) => {
    req.user.avatar = req.file.buffer;

    await req.user.save();

    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
});

// Delete avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send('The avatar has been deleted');
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});

// Serve avatar
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error('error');
        }

        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

module.exports = { router };