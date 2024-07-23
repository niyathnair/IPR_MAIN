import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/SystemMonitor.css';

function SystemMonitor() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:4000/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Fetch stats every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SystemMonitor">
      <h1>System Monitor</h1>
      <h2>CPU Load: {stats.cpu.toFixed(2)}%</h2>
      <h2>Memory Usage:</h2>
      <ul>
        <li>Total: {(stats.memory.total / (1024 ** 3)).toFixed(2)} GB</li>
        <li>Used: {(stats.memory.used / (1024 ** 3)).toFixed(2)} GB</li>
        <li>Free: {(stats.memory.free / (1024 ** 3)).toFixed(2)} GB</li>
      </ul>
      <h2>Running Applications:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>CPU %</th>
            <th>Memory</th>
            <th>Network In</th>
            <th>Network Out</th>
          </tr>
        </thead>
        <tbody>
          {stats.processes.slice(0, 10).map((process) => (
            <tr key={process.pid}>
              <td>{process.name}</td>
              <td>{process.pcpu.toFixed(2)}%</td>
              <td>{(process.mem / (1024 * 1024)).toFixed(2)} MB</td>
              <td>{(stats.network.find(n => n.iface === process.name)?.rx_sec || 0).toFixed(2)} MB/s</td>
              <td>{(stats.network.find(n => n.iface === process.name)?.tx_sec || 0).toFixed(2)} MB/s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SystemMonitor;
