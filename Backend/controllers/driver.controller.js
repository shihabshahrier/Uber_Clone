const driverModel = require('../models/driver.model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');
const driverService = require('../services/driver.service');


module.exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {fullname, email, password, vehicle} = req.body;
        exsistingDriver = await driverModel.findOne({ email });
        if (exsistingDriver) {
            return res.status(400).json({ message: 'Driver already exists' });
        }
        const driver = await driverService.createDriver({firstname:fullname.firstname, lastname:fullname.lastname, email, password, color:vehicle.color, plate:vehicle.plateNumber, capacity:vehicle.capacity, vehicleType:vehicle.vehicleType});
        await driver.save();
        const token = driver.generateAuthToken();
        res.status(201).json({message: "Sign Up Successfull", driver, token });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


module.exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const driver = await driverModel.findOne({ email }).select('+password');
        if (!driver || !(await driver.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = driver.generateAuthToken();
        
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: "Login Successfull", driver, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports.getDriverProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.driver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1] || null;
        if (!token) {
            return res.status(401).json({ message: 'You need to login' });
        }
        await blackListTokenModel.create({ token });
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout Successfull' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}