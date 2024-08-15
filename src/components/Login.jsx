import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const isValidUser = await login(values.username, values.password);
        if (!isValidUser) {
          setLoginError(true);
        }
      } catch (error) {
        console.error('Login error:', error);
        setLoginError(true);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#002244' }}>
      <div className="w-50 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px' }}>
        <h1 className="text-center mb-4 text-white">Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <label className="text-white">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={(e) => {
                formik.handleChange(e);
                setLoginError(false); 
              }}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-danger">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label className="text-white">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={(e) => {
                formik.handleChange(e);
                setLoginError(false); 
              }}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          {loginError && (
            <div className="text-danger text-center mb-3">
              Incorrect username or password
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-white">Don't have an account? <Link to="/register" className="text-info">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
