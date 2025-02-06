import React, { useState } from 'react';
import axios from 'axios';

const MessageForm = ({ senderId }) => {
    const [receiverId, setReceiverId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/messages', {
                senderId,
                receiverId,
                message,
            });
            alert('Message sent');
        } catch (err) {
            console.log('Failed to send message');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
            type="number"
            placeholder='Receiver ID'
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            />

            <textarea
            placeholder='Message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    )
};

export default MessageForm;

