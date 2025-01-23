const userModel = require('../models/user.model');
const driverModel = require('../models/driver.model');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');

module.exports.authUser = async (req, res, next) => {
    try {
        // Safely extract token from cookies or Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1] || null;

        if (!token) {
            return res.status(401).json({ message: 'You need to login' });
        }

        // Check if token is blacklisted
        const isBlackListed = await blackListTokenModel.findOne({ token });
        if (isBlackListed) {
            return res.status(401).json({ message: 'Token has been blacklisted. Please login again' });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user in the database
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid user. Please login again' });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token. Please login again' });
    }
};

module.exports.authDriver = async (req, res, next) => {
    try {
        // Safely extract token from cookies or Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1] || null;
        if (!token) {
            return res.status(401).json({ message: 'You need to login' });
        }

        // Check if token is blacklisted
        const isBlackListed = await blackListTokenModel.findOne({ token });
        if (isBlackListed) {
            return res.status(401).json({ message: 'Token has been blacklisted. Please login again' });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find driver in the database
        const driver = await driverModel.findById(decoded._id);
        if (!driver) {
            return res.status(401).json({ message: 'Invalid driver. Please login again' });
        }

        // Attach driver to request object
        req.driver = driver;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token. Please login again' });
    }
};
