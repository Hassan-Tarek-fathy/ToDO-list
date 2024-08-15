import React from 'react';
import { FaCircle, FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

const TaskList = ({ filteredTodos, handleEdit, handleDone, handleDel }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red'; 
      case 'Normal':
        return 'blue'; 
      case 'Low':
        return 'green'; 
      default:
        return 'gray'; 
    }
  };

  const getTaskColor = (dueDate, completed) => {
    const now = new Date();
    const taskDueDate = new Date(dueDate);
    const timeDiff = taskDueDate - now;

    if (completed) {
      return 'green'; 
    } else if (timeDiff < 0) { 
      return '#333'; 
    } else if (timeDiff < 2 * 24 * 60 * 60 * 1000) { 
      return 'red'; 
    } else {
      return 'white'; 
    }
  };

  const getTextColor = (bgColor) => {
    if (bgColor === 'black') {
      return 'white'; 
    } else if (bgColor === 'white') {
      return 'black'; 
    } else if (bgColor === 'red') {
      return 'white'; 
    } else if (bgColor === 'green') {
      return 'white'; 
    }
    return 'black'; 
  };

  const getTrashIconColor = (bgColor) => {
    return bgColor === 'red' ? 'black' : 'red';
  };

  const handleDeleteWithConfirmation = (index) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      handleDel(index);
    }
  };

  return (
    <main className="p-4">
      <div className="row">
        {filteredTodos.map((todo, index) => {
          const bgColor = getTaskColor(todo.dueDate, todo.completed);
          const textColor = getTextColor(bgColor);
          const iconColor = todo.completed ? 'gray' : 'orange';
          const trashIconColor = getTrashIconColor(bgColor);
          
          return (
            <div key={todo.id} className="col-md-4 mb-3">
              <div
                className="card"
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                }}
              >
                <div className="card-body">
                  <h5 className="card-title d-flex align-items-center">
                    <FaCircle
                      style={{ color: getPriorityColor(todo.priority) }}
                      className="me-2"
                    />
                    {todo.task}
                  </h5>
                  <p className="card-text">
                    Deadline: {new Date(todo.dueDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    Description: {todo.description}
                  </p>
                  <div className="d-flex">
                    <FaCheck
                      className="me-2 cursor-pointer"
                      onClick={() => handleDone(index)}
                      title={todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                      style={{ fontSize: '1.5rem', color: iconColor }}
                    />
                    <FaEdit
                      className="me-2 cursor-pointer"
                      onClick={() => handleEdit(todo)}
                      title="Edit"
                      style={{ fontSize: '1.5rem' }}
                    />
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => handleDeleteWithConfirmation(index)}
                      title="Delete"
                      style={{ fontSize: '1.5rem', color: trashIconColor }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default TaskList;
