const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const userRoute = require('./routes/users.route');

db.connect();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;