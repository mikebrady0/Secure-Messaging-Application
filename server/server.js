const express = require('express');
const cors = requrie('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js')

const app = express();
const port = 5000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'secure_messaging',
    password: 'Ballislife10',
    port: 5432,
});

// Routes will go here
app.listen(port, () => {
    console.log(`Server running on ${port}`)
});