import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import NavBar from '../components/NavBar'; 
import '../App.css'; 
export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({
    task: '',
    priority: 'Normal',
    dueDate: '',
    description: '',
    completed: false,
  });
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterCompleted, setFilterCompleted] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todos?userId=${user.id}`);
        setTodos(response.data);
        setFilteredTodos(response.data);
      } catch (error) {
        setError('Failed to fetch tasks.');
      }
    };
    fetchTodos();
  }, [user.id]);

  useEffect(() => {
    let updatedTodos = [...todos];

    if (filterPriority !== 'All') {
      updatedTodos = updatedTodos.filter(todo => todo.priority === filterPriority);
    }

    if (filterCompleted !== 'All') {
      updatedTodos = updatedTodos.filter(todo => 
        filterCompleted === 'Completed' ? todo.completed : !todo.completed
      );
    }

    if (searchTerm) {
      updatedTodos = updatedTodos.filter(todo => 
        todo.task.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTodos(updatedTodos);
  }, [filterPriority, filterCompleted, searchTerm, todos]);

  const indexOfLastTodo = currentPage * tasksPerPage;
  const indexOfFirstTodo = indexOfLastTodo - tasksPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:3000/todos', { ...newTask, userId: user.id });
      setTodos([...todos, { ...newTask, userId: user.id }]);
      setNewTask({
        task: '',
        priority: 'Normal',
        dueDate: '',
        description: '',
        completed: false,
      });
      setShowModal(false);
    } catch (error) {
      setError('Failed to add task.');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/todos/${editingTask.id}`, newTask);
      setTodos(todos.map(todo => todo.id === editingTask.id ? newTask : todo));
      setNewTask({
        task: '',
        priority: 'Normal',
        dueDate: '',
        description: '',
        completed: false,
      });
      setEditingTask(null);
      setShowModal(false);
    } catch (error) {
      setError('Failed to update task.');
    }
  };

  const handleEdit = (task) => {
    setNewTask(task);
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDone = async (index) => {
    const task = currentTodos[index];
    try {
      await axios.put(`http://localhost:3000/todos/${task.id}`, {
        ...task,
        completed: !task.completed,
      });
      setTodos(todos.map(todo => todo.id === task.id ? { ...task, completed: !task.completed } : todo));
    } catch (error) {
      setError('Failed to update task status.');
    }
  };

  const handleDel = async (index) => {
    const task = currentTodos[index];
    try {
      await axios.delete(`http://localhost:3000/todos/${task.id}`);
      setTodos(todos.filter(todo => todo.id !== task.id));
    } catch (error) {
      setError('Failed to delete task.');
    }
  };

  const resetForm = () => {
    setNewTask({
      task: '',
      priority: 'Normal',
      dueDate: '',
      description: '',
      completed: false,
    });
    setEditingTask(null);
    setShowModal(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-dark-blue">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        filterCompleted={filterCompleted}
        setFilterCompleted={setFilterCompleted}
        showModal={() => setShowModal(true)}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      {filteredTodos.length > tasksPerPage && (
        <NavBar
          currentPage={currentPage}
          totalTasks={filteredTodos.length}
          onPageChange={handlePageChange}
        />
      )}
      <TaskList
        filteredTodos={currentTodos}
        handleEdit={handleEdit}
        handleDone={handleDone}
        handleDel={handleDel}
      />
      <TaskModal
        showModal={showModal}
        resetForm={resetForm}
        newTask={newTask}
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        editingTask={editingTask}
      />
    </div>
  );
}
