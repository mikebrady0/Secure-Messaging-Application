import React from 'react';
import MessageList from './MessageList';

const Dashboard = () => {
    const userId = localStorage.getItem('userId');

    return (
        <div>
            <h1>Dashboard</h1>
            <MessageList userId={userId} />
        </div>
    );
};

export default Dashboard;