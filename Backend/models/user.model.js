const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be at least 3 characters']
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, 'Lastname must be at least 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Email must be at least 3 characters'],
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    socketid: {
        type: String,
    }
});

// Generate JWT Token
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Set expiry for security
};

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash Password Before Saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Exit early if password is not modified
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
