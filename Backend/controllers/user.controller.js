const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const blackListTokenModel = require('../models/blackListToken.model');



module.exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {fullname, email, password} = req.body;
        exsistingUser = await userModel.findOne({ email });
        if (exsistingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await userService.createUser({firstname: fullname.firstname, lastname: fullname.lastname, email, password});
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).json({message: "Sign Up Successfull", user, token });
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
        const user = await userModel.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = user.generateAuthToken();
        
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: "Login Successfull", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getUserProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('token');
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        const blackListToken = new blackListTokenModel({ token });
        await blackListToken.save();
        res.status(200).json({ message: "Logout Successfull" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}