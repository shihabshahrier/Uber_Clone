const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const driverSchema = new mongoose.Schema({
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
    },

    status: {
        type: String,
        enum : ['active','inactive'],
        default: 'inactive'
    },

    vehicle: {
        color: {
            type: String,
            minlength: [3, 'Color must be at least 3 characters'],
            required: true,
        },
        plateNumber: {
            type: String,
            minlength: [3, 'Plate number must be at least 3 characters'],
            required: true,
        },

        capacity: {
            type: Number,
            required: true,
            min: 1,
        },

        vehicleType: {
            type: String,
            enum : ['car','Moto','CNG'],
            required: true,
        }
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    }

});

// Generate JWT Token
driverSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' }); // Set expiry for security
};

// Compare Password
driverSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash Password Before Saving
driverSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Exit early if password is not modified
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const driverModel = mongoose.model('Driver', driverSchema);

module.exports = driverModel;