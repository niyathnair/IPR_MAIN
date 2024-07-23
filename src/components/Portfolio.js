import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
    return (
        <div className="container">
            <h1>Portfolio</h1>
            {/* Portfolio content */}
            <Link to="/tasks" className="button">Back to Task Page</Link>
        </div>
    );
}

export default Portfolio;
