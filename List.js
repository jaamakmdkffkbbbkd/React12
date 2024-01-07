import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/tasks', { title });
            setTasks([...tasks, response.data]);
            setTitle('');
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Tasks</h1>
            <form onSubmit={addTask}>
                <label>Task:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type="submit">Add Task</button
                );
}
export 

                