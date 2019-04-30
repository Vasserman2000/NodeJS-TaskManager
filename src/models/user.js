const mongoose = require('mongoose');
const validator = require('validator')


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },  
    age: {
        type: Number,
        validate(value) {
            if (value < 18) {
                throw new Error('Age must be 18 or older');
            }
        },
        default: 0
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        minlength: [6, 'Minimum password length is 6 characters'],
        trim: true,
        validate(value) {
            if (validator.matches(value, 'password')) {
                throw new Error ('You can\'t chose this password')
            }
        }
    }
});

module.exports = { User }