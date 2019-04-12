const mongoose = require('mongoose');
const user = require('../models/user');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});



const newUser = user.User({
    name: 'Eli  ',
    age: 19,
    email: 'Alan@gmail.com'
});

newUser.save().then(() => {
    console.log(newUser);
}).catch((error) => {
    console.log(error.message);
});



// const task = new Task({
//     description: 'Go to school',
//     completed: false
// });

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log(error)
// });

//mongoose.connection.close();