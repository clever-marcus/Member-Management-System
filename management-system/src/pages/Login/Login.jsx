import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom'

const Login = () => {
  // State to manage form data (email and password)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Function to handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the input event
    setFormData({
      ...formData, // Preserve existing form data
      [name]: value, // Update the specific field
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    try {
      // Send a POST request to the login endpoint
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Specific JSON content type
        },
        body: JSON.stringify(formData), // Convert form data to JSON
      });

      // Parse the response as JSON
      const result = await response.json();
      if (response.ok) {
        // If the resonse is successful, log the result and vavigate to the employee page
        console.log('Login successful:', result);
        navigate('/employee');

        // Store the user data and token in localStorage
        const user = JSON.stringify(result.user);
        localStorage.setItem("user", user);
        localStorage.setItem("token", result.token)

      } else {
        // If login fails, log the error message and display an alert
        console.error('Login failed!', result.message);
        alert(result.message);
      }
    } catch (error) {
      // Handle network or other unexpected errors
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
