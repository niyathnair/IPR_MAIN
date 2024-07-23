import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../Assets/logo.png';
import { UserContext } from '../context/UserContext'; // Import UserContext

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext); // Use the context
    const [formData, setFormData] = useState({
        handleOrEmail: '',
        password: '',
        employee_id: '' // Add employee_id
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', {
                handleOrEmail: formData.handleOrEmail,
                password: formData.password,
                employee_id: formData.employee_id // Send employee_id
            });
            if (response.data.success) {
                setUser({ handle: response.data.handle }); // Set the user context
                if (response.data.isManager) {
                    navigate('/manager-tasks'); // Redirect to manager tasks page
                } else {
                    navigate('/tasks'); // Redirect to tasks page
                }
            } else {
                setError('Invalid handle/email or password');
            }
        } catch (error) {
            console.error("There was an error logging in!", error);
            setError('An error occurred while trying to log in');
        }
    };

    return (
        <div className="login-container">
            <header className="header">
                <h1>XYZ_INTERN</h1>
                <div className="nav">
                    <img className="header-logo" src={logo} alt="Company Logo" />
                    <Link to="/login">Enter</Link> | <Link to="/signup">Register</Link>
                </div>
            </header>
            <nav className="main-nav">
                <a href="#">Home</a>
                <a href="#">Top</a> 
                <a href="#">Groups</a>
                <a href="#">Rating</a>
                <a href="#">Calendar</a>
                <a href="#">Community</a>
            </nav>
            <div className="login-form-container">
                <div className="info-text">
                    <p><strong>Fill in the form to login into IPR Portal.</strong></p>
                    <p>You can use <a href="#">Gmail</a> as an alternative way to enter.</p>
                </div>
                <div className="login-form-box">
                    <h2>Login into IPR Portal</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Handle/Email</label>
                            <input
                                type="text"
                                name="handleOrEmail"
                                placeholder="Handle/Email"
                                value={formData.handleOrEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Employee ID (if applicable)</label> {/* Add employee_id field */}
                            <input
                                type="text"
                                name="employee_id"
                                placeholder="Employee ID"
                                value={formData.employee_id}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">Remember me for a month</label>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="button">Login</button>
                    </form>
                    <a href="#" className="forgot-password">Forgot your password?</a>
                    <a href="#" className="use-gmail">Use Gmail</a>
                </div>
            </div>
            <footer className="footer">
                <p>IPR Profile (c) Copyright 20XX-20XX Niyath&amp;Chaital</p>
                <p>Server time: Jul/12/2024 17:17:21 UTC</p>
                <p>Desktop version, switch to <a href="#">mobile version</a></p>
                <p><a href="#">Privacy Policy</a></p>
                <p>Supported by</p>
                <img className="footer-logo" src={logo} alt="IPR Logo" />
            </footer>
        </div>
    );
}

export default Login;
