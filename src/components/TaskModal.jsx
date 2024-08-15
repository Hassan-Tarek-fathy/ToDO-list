import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskModal = ({ showModal, resetForm, newTask, handleChange, handleAdd, handleUpdate, editingTask }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const validateDueDate = () => {
    const now = new Date();
    const dueDate = new Date(newTask.dueDate);

    now.setHours(0, 0, 0, 0);

    if (dueDate < now) {
      setErrorMessage('Due date cannot be in the past.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = () => {
    if (validateDueDate()) {
      if (editingTask) {
        handleUpdate();
      } else {
        handleAdd();
      }
      resetForm(); 
    }
  };

  return (
    <Modal show={showModal} onHide={resetForm}>
      <Modal.Header closeButton>
        <Modal.Title>{editingTask ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTask">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task"
              name="task"
              value={newTask.task}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDueDate">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleChange}
            />
            {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={newTask.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={resetForm}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
