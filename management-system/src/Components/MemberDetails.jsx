import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetEmployeeDetailsById } from '../api';

/**
 * EmployeeDetails component displays detailed information about a specific employee.
 * 
 */

const EmployeeDetails = () => {
    const navigate = useNavigate();

    // Extract the employee ID from the URL parameters.
    const { id } = useParams();

    // State to store employee details.
    const [employee, setEmployee] = useState({});

    // Fetch the details of an employee by ID.
    const fetchEmployeeDetails = async () => {
        try {
            // Call the API to get employee details.
            const data = await GetEmployeeDetailsById(id);
            // Update the state with the fetched data.
            setEmployee(data);
        } catch (err) {
            // Display an error alert if the API call fails
            alert('Error', err);
        }
    }
    // Effect Hook to fetch employee details when the component mounts or when the `id` changes.
    useEffect(() => {
        fetchEmployeeDetails();
    }, [id])

    // If the employee object is empty or not found, display a fallback mesaage.
    if (!employee) {
        return <div>Employee not found</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Employee Details</h2>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <img
                                src={employee.profileImage} // EMployee profile image URL
                                alt={employee.name} // Alternate text as employee's name
                                className="img-fluid rounded" // Bootstrap styling
                            />
                        </div>
                        <div className="col-md-9">
                            <h4>{employee.name}</h4>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Phone:</strong> {employee.phone}</p>
                            <p><strong>Department:</strong> {employee.department}</p>
                            <p><strong>Salary:</strong> {employee.salary}</p>
                        </div>
                    </div>
                    {/* Back button to navigate to the employee list. */}
                    <button className="btn btn-primary" onClick={() => navigate('/employee')}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
