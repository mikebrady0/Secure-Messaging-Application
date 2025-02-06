import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [resultMsg, setResultMsg] = useState('');

    const navigate = useNavigate();

    //timeout delay function
    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        // Repsonse to post request endpoint
        const response = await axios.post('http://localhost:5000/register', {
            username,
            password,
        });

        setResultMsg(`Registration successful User ID: ${response.data.userId}`);
        await timeout(1000);
        navigate('/dashboard', { replace: true });
        } catch (err) {
            setResultMsg(err.response?.data?.error || 'Registration failed. Please try again.')
        }
    };

    return (
        <div>
            <button onClick={() => navigate('/', { replace: true})}>Back</button>
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