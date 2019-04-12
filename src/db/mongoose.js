const mongoose = require('mongoose');
const user = require('../models/user');
const task = require('../models/task')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});



// const newUser = user.User({
//     name: 'David',
//     age: 21,
//     email: 'J1s@gmail.com',
//     password: 'a1b2c3'
// });

// newUser.save().then(() => {
//     console.log(newUser);
// }).catch((error) => {
//     console.log(error.message);
// });



const newTask = task.Task({
    description: 'Go to school  ',
    // completed: false
});

newTask.save().then(() => {
    console.log(newTask);
}).catch((error) => {
    console.log(error)
});

// mongoose.connection.close();