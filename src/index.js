const express = require('express');
require('../src/db/mongoose');
const User = require('../src/models/user')


const app = express();

const port = process.env.PORT || 3000;

// parse http request body to json?
app.use(express.json());

app.post('/users', (req, res) => {
    const user = User.User(req.body);

    user.save().then(() => {
        res.send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

