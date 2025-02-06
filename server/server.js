const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');
const { send } = require('process');

const app = express();
const port = 5000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

// pool for postgres db
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'secure_messaging',
    password: 'Ballislife10',
    port: 5432,
});

// Routes will go here
app.listen(port, () => {
    console.log(`Server running on ${port}`)
});

// Registering a new user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

// Error handdling the user registration
    try {
        const result = await pool.query(
            'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
            [username, passwordHash]
        );
        res.status(201).json({ userId: result.rows[0].id });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed'})
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Login error handling

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = result.rows[0];
        if (bcrypt.compareSync(password, user.password_hash)) {
            res.json({ userId: user.id });
        } else {
            res.status(400).json({ error: 'Invalid password' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});

const SECRET_KEY = 'secure-messaging-key'; // Use a secure key in production

// Encrypt messages

function encryptMessage(message) {
    return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
}

// Decrypt messages
function decryptMessages(encryptedMessage) {
    const bytes = CryptoJS.AES.decrypt(encryptMessage, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}


app.post('/messages', async (req, res) => {
    const { senderId, receiverId, message } = req.body;
    const encryptedMessage = encrypt(message);

    try {
        await pool.query(
            'INSERT INTO messages (sender_id, receiver_id, encrypted_message) VALUES ($1, $2, $3)',
            [senderId, receiverId, encryptedMessage]
        );
        res.status(201).json({ success: true});
    } catch (err) {
        res.status(500).json({ error: 'Failed to send message' });
    };
})
 // Retrieve messages
app.get('/messages/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM messages WHERE receiver_id = $1 ORDER BY timestamp',
            [userId]
        );

        const messages = result.rows.map(row => ({
            ...row,
            message: decryptMessage(row.encrypted_message),
        }));
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve messages'});
    }
})