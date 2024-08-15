import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const { register } = useAuth();
  const [usernameExists, setUsernameExists] = useState(false);

  const checkUserExists = async (username) => {
    try {
      const response = await fetch(`http://localhost:3000/users?username=${username}`);
      const users = await response.json();
      return users.length > 0;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
        .test('checkUsernameUnique', 'Username is already taken', async (value) => {
          if (value && !formik.isSubmitting) {
            const isUnique = await checkUserExists(value);
            return !isUnique;
          }
          return true;
        }),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      const userExists = await checkUserExists(values.username);
      if (userExists) {
        setUsernameExists(true);
      } else {
        const isRegistered = await register(values.username, values.password);
        if (isRegistered) {
        } else {
          setUsernameExists(true);
        }
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#002244' }}>
      <div className="w-50 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px' }}>
        <h1 className="text-center mb-4 text-white">Create Account</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <label className="text-white">Username</label>
            <input
              type="text"
              name="username"
              className={`form-control ${formik.touched.username && (formik.errors.username || usernameExists) ? 'is-invalid' : ''}`}
              onChange={(e) => {
                formik.handleChange(e);
                setUsernameExists(false); 
              }}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-danger">{formik.errors.username}</div>
            ) : null}
            {usernameExists && !formik.errors.username && (
              <div className="text-danger">Username is already taken</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="text-white">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label className="text-white">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-danger">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-white">Already have an account? <Link to="/login" className="text-info">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
