const mongoose = require('mongoose');
const user = require('../models/user');
const task = require('../models/task')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});