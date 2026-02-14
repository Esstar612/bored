import React from 'react';
import './App.css';
import './css/Signup.css'
import './css/loginpage.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register.js';
import Login from './Pages/Login.js';
import Welcome from './Pages/Welcome.js';
import Outdoor from './Outdoor/Outdoor.jsx';
import Indoor from './Indoor/Indoor.jsx'; 
import SpotifyRedirect from './Indoor/Components/SpotifyRedirect.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/outdoor" element={<Outdoor />} />
                <Route path="/indoor" element={<Indoor />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/spotify-redirect-internal" element={<SpotifyRedirect />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;