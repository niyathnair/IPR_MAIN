import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Tasks.css';
import logo from '../Assets/logo.png';
import { UserContext } from '../context/UserContext'; // Import UserContext

const Tasks = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(UserContext); // Use the context

    useEffect(() => {
        if (user && user.handle) {
            fetch(`http://localhost:4000/tasks/${user.handle}`)
                .then(response => response.json())
                .then(data => setTasks(data))
                .catch(error => console.error('Error fetching tasks:', error));
        }
    }, [user]);

    const handleEnrollClick = (task) => {
        setSelectedTask(task);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedTask(null);
    };

    return (
        <div className="tasks-container">
            <header className="header">
                <h1>XYZ_INTERN</h1>
                <div className="nav">
                    <img className="header-logo" src={logo} alt="Company Logo" />
                    <Link to="/login">Logout</Link> | <Link to="/portfolio">Portfolio</Link>
                </div>
            </header>
            <nav className="main-nav">
                <a href="#">Home</a>
                <a href="#">MONITOR</a>
                <a href="#">Groups</a>
                <a href="#">Rating</a>
                <a href="/calendar">Calendar</a>
                <a href="/taskpage">Community</a>
            </nav>
            <div className="tasks-content">
                <div className="courses-table">
                    <h2>Tasks</h2>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Created</th>
                                    <th>Interns</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task.task_id}>
                                        <td>{task.task_id}</td>
                                        <td>
                                            <strong>{task.name}</strong>
                                            <p>{task.briefDescription}</p>
                                        </td>
                                        <td>{new Date(task.created).toLocaleDateString()}</td>
                                        <td>
                                            <button className="enroll-button" onClick={() => handleEnrollClick(task)}>Enroll</button>
                                            <span>{task.students}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="about-company">
                    <h3>About Our Company</h3>
                    <p>Welcome to XYZ Corporation! We are thrilled to have you join us as an intern. This section will provide you with the necessary information and instructions to get you started.</p>
                    <p>During your internship, you will be involved in various tasks and projects that will help you develop your skills and gain valuable experience. Please make sure to complete all the onboarding documentation and set up your work environment.</p>
                    <p>We have an orientation meeting scheduled where you will learn about our company policies and procedures. It's also a great opportunity to meet your team and understand your role and responsibilities.</p>
                    <img className="about-company-logo" src={logo} alt="Company Logo" />
                </div>
            </div>
            <div className="recent-actions">
                <h3>Recent actions</h3>
                <p>Recent actions is empty now</p>
            </div>
            <footer className="footer">
                <p>Server time: Jul/12/2024 17:24:44 UTC</p>
                <p>Desktop version, switch to <Link to="#">mobile version</Link></p>
                <p><Link to="#">Privacy Policy</Link></p>
                <p>Supported by</p>
                <img className="footer-logo" src={logo} alt="IPR Logo" />
            </footer>
            <div className="manager-button-container">
                <Link to="/manager-tasks">
                    <button className="manager-button">Go to Manager Task Page</button>
                </Link>
            </div>
            {isPopupOpen && selectedTask && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedTask.name}</h2>
                        <p>{selectedTask.detailedDescription}</p>
                        <button className="close-button" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;
