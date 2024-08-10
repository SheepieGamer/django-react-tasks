import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const TaskForm = ({ taskToEdit, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [taskToEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = taskToEdit
            ? `/api/tasks/${taskToEdit.id}/`
            : '/api/tasks/';

        const method = taskToEdit ? 'PUT' : 'POST';

        axios({ method, url, data: { title, description } })
            .then(response => {
                onUpdate(); // Notify parent to refresh task list
                setTitle('');
                setDescription('');
            })
            .catch(error => console.error('Error submitting task:', error));
    };

    return (
        <Container>
            <h2 className="mt-4 mb-3">{taskToEdit ? 'Edit Task' : 'Add Task'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    {taskToEdit ? 'Update Task' : 'Add Task'}
                </Button>
            </Form>
        </Container>
    );
};

export default TaskForm;
