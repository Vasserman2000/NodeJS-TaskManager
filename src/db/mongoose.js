const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});


// const me = new User({
//     name: 'Joe',
//     age: 'shalom'
// });

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log(error.message);
// });

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

const task = new Task({
    description: 'Go to school',
    completed: false
});

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log(error)
});