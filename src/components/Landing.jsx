import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center" style={{ backgroundColor: '#002244' }}>
      <h1 className="mb-4 text-white">
        Welcome to the To<span style={{ color: 'red' }}>Do</span> 
      </h1>
      <p className="mb-4 text-white">
        
        <Link to="/login" className="btn btn-success mx-2">Login</Link> 
    
        <Link to="/register" className="btn btn-warning mx-2">Register</Link> 
        
      </p>
      <div>
        
      </div>
    </div>
  );
};

export default Landing;
