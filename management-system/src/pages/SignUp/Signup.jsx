import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Preserve exisiting state values
      [name]: value, // Update the specific field
    });
  };
  // Handles form submission for user registration
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Submiting formData:", formData)
    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Inform form data to JSON
        },
        body: JSON.stringify(formData), // Convert form data to JSON
      });

      // Check if the response indicates an error
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        throw new Error(errorData.message || "Failed to register");
      }
      // If registration is successful, navigate to the login page
      const result = await response.json();
      if (result.user._id) {
        navigate('/login');
      } else {
        console.error('Signup failed!');
      }
    } catch (error) {
      console.error(error.message); // Log any errors encountered
    }
  };

  /*
    When the handleSubmit function is triggered, the form data is sent to the backend
    API using a POST request.
    The backend server processes the request and stores the user information in a MongoDB database
  */

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <div className="d-flex flex-column align-items-center">
        <div
          className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center mb-3"
          style={{ width: '50px', height: '50px' }}
        >
          <PersonFill size={24} />
        </div>
        <h1 className="h5 mb-4">Sign Up</h1>
      </div>
      <Form>
        <Row className="mb-3">
          <Col xs={12} sm={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                autoComplete="given-name"
                required
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                autoComplete="family-name"
                required
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
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
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit} className="w-100 mb-3">
          Sign Up
        </Button>
        <div className="text-center">
          <Link to="/login" className="text-decoration-none">
            Already have an account? Sign in
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default Signup;
