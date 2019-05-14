const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    }
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.pre('save', async function (next) {
    const user = this;
    
    if (user.isModified('password')) {
        console.log('THE PASSWORD IS EITHER NEW OR WAS MODIFIED. SAVING NEW HASHED PASSWORD.');
        user.password = await bcrypt.hash(user.password, 8);
    }

    // important:
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = { User }