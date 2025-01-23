const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body("fullname").isLength({min: 3}).withMessage('Fullname must be at least 3 characters long'),
    body("password").isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
], userController.register);

module.exports = router;