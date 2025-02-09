import React from 'react';
import MessageList from './MessageList';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const userId = localStorage.getItem('userId');

    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <button onClick={() => navigate('/', { replace: true})}>Log Out</button>
            <h1>Dashboard</h1>
            <MessageList userId={userId} />


            <div>
                <h2>Send Message</h2>
                <button onClick={() => navigate('/messageForm', { replace: true })}>Send Message</button>
            </div>
        </div>
    );
};

export default Dashboard;