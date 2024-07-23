import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/calendar.css';
import logo from '../Assets/logo.png';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();

    const renderCalendar = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(<div className="empty" key={`empty-${i}`}></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

            days.push(
                <div className={`day ${isToday ? 'today' : ''}`} key={day}>
                    {day}
                </div>
            );
        }

        return days;
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    return (
        <div className="calendar-container">
            <header className="header">
                <h1>XYZ_INTERN</h1>
                <div className="nav">
                    <a href="/login">Logout</a> | <a href="/portfolio">Portfolio</a>
                </div>
            </header>
            <nav className="main-nav">
                {/* Task Page */}
                <a href="/tasks">Home</a>
                {/* Ranking */}
                <a href="#">Top</a> 
                {/* <a href="#">Catalog</a> */}
                {/* Community */}
                <a href="#">Groups</a>
                {/* Ranting Overall*/}
                <a href="#">Rating</a>
                {/* <a href="#">Edu</a>
                <a href="#">API</a> */}
                {/* Task Calender */}
                <a href="#">Calendar</a>
                {/* ask doubts */}
                <a href="#">Help</a>
            </nav>
            <div className="calendar-content">
                <h2></h2>
                <h2></h2>
                {/* <h2>Calendar</h2> */}
                <div className="calendar-header">
                    <button onClick={prevMonth}>Previous</button>
                    <div>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</div>
                    <button onClick={nextMonth}>Next</button>
                </div>
                <div className="calendar-grid">
                    <div className="day-name">Sun</div>
                    <div className="day-name">Mon</div>
                    <div className="day-name">Tue</div>
                    <div className="day-name">Wed</div>
                    <div className="day-name">Thu</div>
                    <div className="day-name">Fri</div>
                    <div className="day-name">Sat</div>
                    {renderCalendar()}
                </div>
            </div>
            <footer className="footer">
                <p>IPR Platform (c) Copyright 20XX-20XX Niyath&amp;Chaital</p>
                <p>Server time: Jul/12/2024 17:24:44 UTC</p>
                <p>Desktop version, switch to <Link to="#">mobile version</Link></p>
                <p><Link to="#">Privacy Policy</Link></p>
                <p>Supported by</p>
                <img className="footer-logo" src={logo} alt="IPR Logo" />
            </footer>
        </div>
    );
};

export default Calendar;
