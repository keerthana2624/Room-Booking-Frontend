import React, { useState } from 'react';
import './Login.css';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    // For now, we'll just navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-paper">
        <Typography component="h1" variant="h5" className="login-title">
          Room Booking System
        </Typography>
        <Typography component="h2" variant="h6" className="login-subtitle">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ marginTop: 24, marginBottom: 16 }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login; 