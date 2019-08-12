const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task').Task;

const userSchema = new mongoose.Schema({
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
        unique: true,
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
    },
    isActive: {
        type: Number
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: Buffer
}, {
    timestamps: true
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.toJSON = function() {
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    // this is an instance method
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login 1');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login 2');
    }

    return user;
}

userSchema.pre('remove', async function (next) {
    const user = this;

    await Task.deleteMany({owner: user._id});

    next();
});

userSchema.pre('save', async function (next) {
    const user = this;
    
    if (user.isModified('password')) {
        //console.log('THE PASSWORD IS EITHER NEW OR WAS MODIFIED. SAVING NEW HASHED PASSWORD.');
        user.password = await bcrypt.hash(user.password, 8);
    }

    // important:
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = { User }