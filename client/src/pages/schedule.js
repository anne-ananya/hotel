import React, { useState } from 'react';
import axios from 'axios';

function Schedule() {
    const [roomNumber, setRoomNumber] = useState('');
    const [typeofSchedule, setTypeofSchedule] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const scheduleData = {
            roomNumber,
            typeofSchedule,
            scheduledTime,
            email
        };

        try {
            const response = await axios.put('https://hotelease.onrender.com/scheduler/schedule', scheduleData);

            console.log(response);

            setSuccess(true);
            setRoomNumber('');
            setTypeofSchedule('');
            setScheduledTime('');
            setEmail('');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '150px auto' }}>
            <h2 style={{ color: '#53a8b6' }}>Schedule Room</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="roomNumber">Room Number:</label>
                    <input type="text" id="roomNumber" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="typeofSchedule">Type of Schedule:</label>
                    <input type="text" id="typeofSchedule" value={typeofSchedule} onChange={(e) => setTypeofSchedule(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="scheduledTime">Scheduled Time:</label>
                    <input type="date" id="scheduledTime" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                </div>
                <button type="submit" style={buttonStyle}>Schedule</button>
            </form>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {success && <p style={{ color: 'green' }}>Room scheduled successfully!</p>}
        </div>
    );
}

const inputStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px'
};

const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#53a8b6',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
};

export default Schedule;
