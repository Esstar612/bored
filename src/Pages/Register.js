import React, { useState } from 'react';
import axios from 'axios';
import '../css/Signup.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        profileImageUrl: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('from rehister.js user info ->', userInfo)
            const response = await axios.post('http://localhost:8080/api/user/register', userInfo);
            navigate('/');
        } catch (error) {
            alert('Registration failed: ' + error);
        }
    };

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    return (
        <div className="app-container">
            <div className="register-container">
                <form onSubmit={handleSubmit}>
                    <input
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                    />
                    <input
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={userInfo.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <label htmlFor="dateOfBirth">Birthday (yyyy-mm-dd)</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={userInfo.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="profileImageUrl"
                        value={userInfo.profileImageUrl}
                        onChange={handleChange}
                        placeholder="Profile Image URL"
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );

}

export default Register;