import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', credentials);
            // alert('Login successful');
            navigate('/indoor', { state: { firstName: response.data.user.firstName } });
        } catch (error) {
            alert('Login failed: ' + error.response.data.error);
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="app-container">
            <div className="form-container">
                <h1 className="header-text">WELCOME TO BORED?</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        className="input-field"
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        className="input-field"
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <div className="footer-links">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        {/* Update this to a Link or a button if it triggers a modal/pop-up */}
                        <Link to="/forgot-password" className="link">Forgot Password ?</Link>
                    </div>
                    <button className="submit-button" type="submit">Login Now</button>
                    {/* Change this button to a Link component */}
                    <Link to="/register" className="signup-button">Sign Up!</Link>
                </form>
                {/* REMOVE ONE SAME AS ABOVE*/}
                <div className="navigation-links">
                    <Link to="/register" className="link">Don't have an account? Sign Up!</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
