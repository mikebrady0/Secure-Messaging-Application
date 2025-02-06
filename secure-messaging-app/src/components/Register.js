import React, { useState } from "react";
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [resultMsg, setResultMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        // Repsonse to post request endpoint
        const response = await axios.post('http://localhost:5000/register', {
            username,
            password,
        });

        setResultMsg(`Registration successful User ID: ${response.data.userId}`);
        } catch (err) {
            setResultMsg(err.response?.data?.error || 'Registration failed. Please try again.')
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                    type="text"
                    label="username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                    type="password"
                    label="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {resultMsg && <p>{resultMsg}</p>}
        </div>
    );

};

export default Register;