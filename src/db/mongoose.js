const mongoose = require('mongoose');
const user = require('../models/user');
const task = require('../models/task')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});