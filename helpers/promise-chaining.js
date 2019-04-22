require('../src/db/mongoose');
const User = require('../src/models/user').User;

User.findByIdAndUpdate('5caf99995aefe12c784ab3e3', { age: 1 }).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 19 });
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});