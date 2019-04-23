const mongoose = require('../src/db/mongoose');
const User = require('../src/models/user').User;
const Task = require('../src/models/task').Task;
const db = mongoose.db;

// User.findByIdAndUpdate('5caf99995aefe12c784ab3e3', { age: 1 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 19 });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

/*******************************/

Task.findByIdAndDelete('5cbf684f5c391112f820b8cd')
    .then((task) => {
        if (!task) {
            return console.log('no such task found')
        }
        console.log(task);

        Task.find({ completed: false }, (err, tasks) => {
            if (tasks.length == 0) {
                return console.log('no tasks that match your criteria')
            }
            console.log(tasks);
        })
    })
    .catch((e)=>{console.log(e.message)});

    