import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageList = ({ userId }) => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Fetch messages for the logged-in user
                const response = await axios.get(`http://localhost:5000/messages/${userId}`);
                setMessages(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch messages. Please try again.');
                setLoading(false);
            }
        };

        fetchMessages();
    }, [userId]);

    if (loading) {
        return <p>Loading messages...</p>
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h2>Your messages</h2>
            {messages.length === 0 ? (
                <p> No messages found</p>
            ) : (
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>
                            <strong>From User {messages.sender_id}:</strong> {messages.message}
                            <br />
                            <small>{new Date(message.timestamp).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default MessageList;