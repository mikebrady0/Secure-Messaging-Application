CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password_hash TEXT NOT NULL
);

CREATE TABLE messages (
	id SERIAL PRIMARY KEY,
	sender_id INT REFERENCES users(id),
	receiver_id INT REFERENCES users(id),
	encrypted_messages TEXT NOT NULL,
	timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);