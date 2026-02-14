import React from 'react';
import { useLocation } from 'react-router-dom';

const Welcome = () => {
    const location = useLocation();
    const { firstName } = location.state || { firstName: 'Guest' }; // Fallback to 'Guest' if firstName is not provided

    return (
        <div className="welcome-container">
            <h1>Welcome, {firstName}!</h1>
        </div>
    );
};

export default Welcome;