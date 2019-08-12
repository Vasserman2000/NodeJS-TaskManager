const jwt = require('jsonwebtoken');
const User = require('../models/user').User;

const auth = async (req, res, next) => {
    try {
        //console.log('in '+'auth: ')
        const token = req.header('Authorization').replace('Bearer ', '');
        //console.log('in '+'auth: '+token)
        //console.log(req.headers)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log('decoded: '+ JSON.stringify(decoded))

        const user = await User.findOne({'_id': decoded._id, 'tokens.token': token });

        //console.log(user)

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports = auth;