const jwt = require('jsonwebtoken');
const User = require('../models/user').User;

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        //console.log(token)
        const decoded = jwt.verify(token, 'thiismynewcourse');
        //console.log(decoded)


        const user = await User.findOne({'_id': decoded._id, 'tokens.token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2RjMTkwNmRkMDY2YzE2ZjA4YjUwMWMiLCJpYXQiOjE1NTgwNjk4MzZ9.-GopsE6XyI-0WL6Vxz1LOJgRWRmjCjI8cQjfG4zMcwc'});
        //console.log('We found a user: ' + user)

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