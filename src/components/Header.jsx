import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Header.css'; 

const Header = ({ searchTerm, setSearchTerm, filterPriority, setFilterPriority, filterCompleted, setFilterCompleted, showModal }) => {
  const { logout } = useAuth();

  return (
    <header className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 border-bottom">
      <h1 className="mb-3 mb-md-0">ToDo</h1>
      <div className="d-flex align-items-center mb-3 mb-md-0">
        <Button 
          className="btn btn-success me-2"
          onClick={showModal}
        >
          Add
        </Button>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button 
          className="btn btn-secondary"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
      <div className="d-flex align-items-center">
        <Form.Control
          as="select"
          className="custom-select me-2"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </Form.Control>
        <Form.Control
          as="select"
          className="custom-select me-2"
          value={filterCompleted}
          onChange={(e) => setFilterCompleted(e.target.value)}
        >
          <option value="All">All Tasks</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </Form.Control>
      </div>
    </header>
  );
};

export default Header;
