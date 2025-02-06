import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MessageForm = ({ senderId }) => {
    const [receiverId, setReceiverId] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!receiverId || !message.trim()) {
            alert("PLease complete all fields.");
            return;
        }

        try {
            await axios.post('http://localhost:5000/messages', {
                senderId,
                receiverId: parseInt(receiverId),
                message,
            });
            console.log('Message sent')
            alert('Message sent');
            setReceiverId('');
            setMessage('');
        } catch (err) {
            console.error('Failed to send message:', err.response?.data || err.message);
            alert('Failed to send message');
        }
    };




    return (
        <div>
        <button onClick={() => navigate('/Dashboard', { replace: true})}>Back</button>
        <form onSubmit={handleSubmit}>
            <input
            type="number"
            placeholder='Receiver ID'
            value={receiverId}
            onChange={(e) => setReceiverId(parseInt(e.target.value) || '')}
            />

            <textarea
            placeholder='Message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
        </div>
    )
};

export default MessageForm;

