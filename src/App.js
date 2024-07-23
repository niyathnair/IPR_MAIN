import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Tasks from './components/Tasks';
import Calendar from './components/Calendar';
import Portfolio from './components/Portfolio';
import ManagerTaskPage from './components/ManagerTaskPage';
import SystemMonitor from './components/SystemMonitor'; // Import SystemMonitor
import { UserProvider } from './context/UserContext';
import './App.css';

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/manager-tasks" element={<ManagerTaskPage />} />
                        <Route path="/system-monitor" element={<SystemMonitor />} /> {/* Add the SystemMonitor route */}
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
