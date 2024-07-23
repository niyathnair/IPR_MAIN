import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ManagerTaskPage.css';
import logo from '../Assets/logo.png';

const ManagerTaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [searchHandle, setSearchHandle] = useState('');
    const [newTask, setNewTask] = useState({
        name: '',
        briefDescription: '',
        detailedDescription: '',
        students: 0,
    });
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleSearch = () => {
        fetch(`http://localhost:4000/tasks/${searchHandle}`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleAddTask = () => {
        fetch('http://localhost:4000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...newTask, handle: searchHandle }),
        })
            .then(response => response.json())
            .then(data => {
                setTasks([...tasks, data]);
                setNewTask({
                    name: '',
                    briefDescription: '',
                    detailedDescription: '',
                    students: 0,
                });
            })
            .catch(error => console.error('Error adding task:', error));
    };

    const handleEnrollClick = (task) => {
        setSelectedTask(task);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedTask(null);
    };

    return (
        <div className="manager-tasks-container tasks-container">
            <header className="header">
                <h1>XYZ_INTERN</h1>
                <div className="nav">
                    <img className="header-logo" src={logo} alt="Company Logo" />
                    <Link to="/login">Logout</Link> | <Link to="/portfolio">Portfolio</Link>
                </div>
            </header>
            <nav className="main-nav">
                <a href="/tasks">Home</a>
                <a href="#">Top</a>
                <a href="#">Groups</a>
                <a href="#">Rating</a>
                <a href="/calendar">Calendar</a>
                <a href="/taskpage">Community</a>
            </nav>
            <div className="tasks-content">
                <div className="courses-table">
                    <h2>Tasks</h2>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by Handle"
                            value={searchHandle}
                            onChange={(e) => setSearchHandle(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
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
                                            <button className="enroll-button" onClick={() => handleEnrollClick(task)}>Edit</button>
                                            <span>{task.students}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="add-task">
                    <h3>Add New Task</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Task Name"
                        value={newTask.name}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="briefDescription"
                        placeholder="Brief Description"
                        value={newTask.briefDescription}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="detailedDescription"
                        placeholder="Detailed Description"
                        value={newTask.detailedDescription}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="students"
                        placeholder="Number of Students"
                        value={newTask.students}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleAddTask}>Add Task</button>
                </div>
            </div>
            <div className="recent-actions">
                <h3>Recent actions</h3>
                <p>Recent actions is empty now</p>
            </div>
            <footer className="footer">
                <p>IPR Platform (c) Copyright 20XX-20XX Niyath&amp;Chaital</p>
                <p>Server time: Jul/12/2024 17:24:44 UTC</p>
                <p>Desktop version, switch to <Link to="#">mobile version</Link></p>
                <p><Link to="#">Privacy Policy</Link></p>
                <p>Supported by</p>
                <img className="footer-logo" src={logo} alt="IPR Logo" />
            </footer>
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

export default ManagerTaskPage;
