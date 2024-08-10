import React from 'react';
import { ListGroup, ListGroupItem, Container, Button } from 'react-bootstrap';
import axios from 'axios';

const TaskList = ({ tasks, onEdit, onDelete }) => {
    const handleDelete = (id) => {
        axios.delete(`/api/tasks/${id}/`)
            .then(response => {
                onDelete(); // Refresh the task list
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    return (
        <Container>
            <h2 className="mt-4 mb-3">Task List</h2>
            <ListGroup>
                {tasks.map(task => (
                    <ListGroupItem key={task.id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{task.title}</h5>
                            <p>{task.description}</p>
                        </div>
                        <div>
                            <Button
                                variant="warning"
                                onClick={() => onEdit(task)}
                                className="me-2"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(task.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
};

export default TaskList;
