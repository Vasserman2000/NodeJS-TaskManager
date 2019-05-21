const jwt = require('jsonwebtoken');
const User = require('../models/user').User;

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token)
        const decoded = jwt.verify(token, 'thiismynewcourse');
        console.log(decoded)

        const user1 = await User.findOne({'id': decoded._id});
        console.log(user)


        const user = await User.findOne({'id': decoded._id, 'tokens.token': token});

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports = auth;