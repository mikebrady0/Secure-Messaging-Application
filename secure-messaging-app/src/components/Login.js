import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [resultMsg, setResultMsg] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const navigate = useNavigate();

    //timeout delay function
    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            
            const userData = { id: response.data.userId, username};
            setCurrentUser(userData);
            localStorage.setItem('currentUser', JSON.stringify({ id: response.data.userId, username }));

            setResultMsg(`Login Successful. User ID: ${response.data.userId}`);
            console.log('Login Successful')

            await timeout(1000);
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setResultMsg(err.response?.data?.error || 'Login Unsuccessful');
        }
    };

    return (
        <div className="aut-form">
            <button onClick={() => navigate('/', { replace: true})}>Back</button>
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
                <button type="submit">Log-In</button>
            </form>
            {resultMsg && <p>{resultMsg}</p>}
        </div>
    );    
};

export default Login;
