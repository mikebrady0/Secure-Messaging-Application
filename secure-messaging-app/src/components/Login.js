import React, { useState } from "react";
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [resultMsg, setResultMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });

            setResultMsg(`Login Successful. User ID: ${response.data.userId}`);
            localStorage.setItem('userId', response.data.userId);
        } catch (err) {
            setResultMsg(err.response?.data?.error || 'Login Unsuccessful');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
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

export default Login;
