const express = require('express');
require('../src/models/user');
const User = require('../src/models/user')

//console.log(User)

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', (req, res) => {
    const user = User.User(req.body);

    user.save().then(() => {
        console.log(user)
    }).catch((error) => {
        console.log(error.message)
    });

    res.send(user.name);
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

