import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('/api/tasks/')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    };

    const handleUpdate = () => {
        fetchTasks(); // Refresh the task list
        setEditingTask(null); // Reset editing task
    };

    const handleEdit = (task) => {
        setEditingTask(task); // Set the task to be edited
    };

    return (
        <div className="App">
            <TaskList tasks={tasks} onEdit={handleEdit} onDelete={fetchTasks} />
            <TaskForm taskToEdit={editingTask} onUpdate={handleUpdate} />
        </div>
    );
}

export default App;
