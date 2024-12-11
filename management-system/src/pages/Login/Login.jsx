import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom'

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Login successful:', result);
        navigate('/employee');
        const user = JSON.stringify(result.user);
        localStorage.setItem("user", user);
        localStorage.setItem("token", result.token)
      } else {
        console.error('Login failed!', result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error('Request error:', error.message);
      alert('An error occurred. Please try again later.')
    }
  };


  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <div className="d-flex flex-column align-items-center">
        <div
          className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center mb-3"
          style={{ width: '50px', height: '50px' }}
        >
          <PersonFill size={24} />
        </div>
        <h1 className="h5 mb-4">Login</h1>
      </div>
      <Form>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit} className="w-100 mb-3">
          Login
        </Button>
        <div className="text-center">
          <Link to="/register" className='text-decoration-none'>
            Don't have an account? Sign up
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
