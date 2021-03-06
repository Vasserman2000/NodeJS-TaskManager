mongoose = require('../src/db/mongoose');
const User = require('../src/models/user').User;
const Task = require('../src/models/task').Task;

/*
User.findByIdAndUpdate('5caf99995aefe12c784ab3e3', { age: 1 }).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 19 });
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});


Task.findByIdAndDelete('5cc0552843fceda17d4d0867').then((task) => {
    if (!task) {
        return console.log('no such task found')
    }
    console.log(task);

    return Task.find({ completed: true }, (err, tasks) => {
        if (tasks.length == 0) {
            console.log('no tasks that match your criteria')
        }
        console.log(tasks);
    });

    // return Task.findByIdAndUpdate('5cbf684f5c391112f820b8c', { completed: true }).then((task) => {
    //     if (!task) {
    //         console.log('could not find such task');
    //     }
    //     console.log(task);
    // });
}).catch((e)=>{console.log(e.message)});
*/


// const updateAgeAndCount = async (id, age) => {

//     const user = await User.findByIdAndUpdate(id, { age });

//     const count =  await User.countDocuments( {age} );

//     return  { user, count };
// }


// updateAgeAndCount('5caf99995aefe12c784ab3e3', 120).then((result) => {

//     console.log(result);

// }).catch((e) => {
//     console.log(e.message);
// });


const deleteTaskAndCount = async (id) => {

    const task = await Task.findByIdAndDelete(id);

    const uncompletedTasks =  Task.find({ completed: false});

    const count = await uncompletedTasks.countDocuments();

    return { task, count };
}

deleteTaskAndCount({_id: '5cbf658b2c3d9840dc5cb53f'}).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err.message);
});