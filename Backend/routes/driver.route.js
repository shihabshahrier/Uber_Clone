const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const driverController = require('../controllers/driver.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body("fullname.firstname").isLength({min: 3}).withMessage('Fullname must be at least 3 characters long'),
    body("fullname.lastname").isLength({min: 3}).withMessage('Fullname must be at least 3 characters long'),
    body("password").isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body("vehicle.color").isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body("vehicle.plateNumber").isLength({min: 3}).withMessage('Plate number must be at least 3 characters long'),
    body("vehicle.capacity").isNumeric().withMessage('Capacity must be a number'),
    body("vehicle.vehicleType").isLength({min: 3}).withMessage('Type must be at least 3 characters long'),
], driverController.register);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body("password").isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
], driverController.login);

router.get("/profile", authMiddleware.authDriver, driverController.getDriverProfile);

router.get("/logout", authMiddleware.authDriver, driverController.logout);

module.exports = router;