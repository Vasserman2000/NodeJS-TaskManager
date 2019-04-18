const express = require('express');
require('../src/db/mongoose');
const User = require('../src/models/user')

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {

    }).catch(() => {

    });

    res.send(user.name);
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

