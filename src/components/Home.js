import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';

const Home = () => {
    return (
        <div className="container">
            <h1>Welcome</h1>
            <Link to="/login" className="button">Login</Link>
            <Link to="/signup" className="button">Signup</Link>
        </div>  
    );
}

export default Home;
