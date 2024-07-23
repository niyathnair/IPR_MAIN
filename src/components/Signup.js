import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/signup.css';
import logo from '../Assets/logo.png';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        handle: '',
        email: '',
        password: '',
        confirmPassword: '',
        employee_id: '' // Add employee_id
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/adduser', {
                handle: formData.handle,
                email: formData.email,
                password: formData.password,
                employee_id: formData.employee_id // Send employee_id
            });
            console.log(response.data);
            navigate('/tasks');
        } catch (error) {
            console.error("There was an error registering the user!", error);
        }
    };

    return (
        <div className="register-container">
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
                <a href="#">Catalog</a>
                <a href="#">Groups</a>
                <a href="#">Rating</a>
                <a href="#">Edu</a>
                <a href="#">API</a>
                <a href="#">Calendar</a>
                <a href="#">Community</a>
            </nav>
            <div className="register-form-container">
                <div className="info-text">
                    <p><strong>Fill in the form to register in XYZ.</strong></p>
                    <p>You can skip this step and login with your <a href="#">Gmail</a>.</p>
                </div>
                <div className="register-form-box">
                    <h2>Register in IPR Portal</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Handle</label>
                            <input
                                type="text"
                                name="handle"
                                placeholder="Handle"
                                value={formData.handle}
                                onChange={handleChange}
                                required
                            />
                            <small>This means your username (nickname) on the IPR Portal. Be careful! You will be able to change it only once in the first 7 days after registration.</small>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
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
                            <small>Password should contain at least five characters.</small>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
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
                        <button type="submit" className="button">Register</button>
                    </form>
                    <p>If you have already registered before, but have not received a confirmation email, please click the <a href="#">link</a>.</p>
                    <a href="#" className="use-gmail">Use Gmail</a>
                </div>
            </div>
            <footer className="footer">
                <p>Codeforces (c) Copyright 20XX-20XX Niyath&amp;Chaital</p>
                <p>The only programming contests Web 2.0 platform</p>
                <p>Server time: Jul/12/2024 17:22:59 UTC</p>
                <p>Desktop version, switch to <a href="#">mobile version</a></p>
                <p><a href="#">Privacy Policy</a></p>
                <p>Supported by</p>
                <img className="footer-logo" src={logo} alt="IPR Logo" />
            </footer>
        </div>
    );
};

export default Signup;
