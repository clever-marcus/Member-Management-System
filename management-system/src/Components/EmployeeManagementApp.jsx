import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';
import { DeleteEmployeeById, GetAllEmployees } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';
import { Link, useNavigate } from 'react-router-dom';

/**
 * EmployeeManagementApp is the main component for managing employees.
 * It includes features like adding, editing, searching, and viewing employees
 * in a paginated table format.
 */


const EmployeeManagementApp = () => {
    // Hook State to manage modal visibility
    const [showModal, setShowModal] = useState(false);
    
    // Hook State to hold the employee object for editing
    const [employeeObj, setEmployeeObj] = useState(null)
    
    /**
     * State to hold employees data and pagination details.
     * `employees`: Array of employee objects.
     * `pagination`: Object containing current page, page size, total employees, and total pages.
     */
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmployees: 0,
            totalPages: 0
        }
    });

    /**
     * 
     * @ param {string} search - Optional search query.
     * @ param {number} page - Current page number.
     * @ param {number} limit - Number of employees per page.
     */

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        console.log('Called fetchEmployees')
        try {
            // Fetch data from API.
            const data =
                await GetAllEmployees(search, page, limit);
            console.log(data);
            
            // Update state with fetched data or default values.
            setEmployeesData(data || { employees: [], pagination: {} });
        } catch (err) {
            console.error('Error fetching employees:', err)
            alert('Error', err); // Display error message.
        }
    };

    // Effect hook to fetch employees when the component mounts
    useEffect(() => {
        fetchEmployees();
    }, [])


    /**
     * Handles search input changes and fetches employees based on the query.
     * 
     * @ param {Object} e - Event object from the input field.
     */
    const handleSearch = (e) => {
        fetchEmployees(e.target.value)
    };

    /**
     * Opens the modal for updating an employee by setting the selected employee object
     * @ param {*} emp - EMployee object to be updated.
     */

    const handleUpdateEmployee = async (emp) => {
        setEmployeeObj(emp); // Set employee to be edited
        setShowModal(true); // Open modal
    };

    

    return (
        <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
            {/* Page Title */}
            <h1>Member Management System</h1>

            {/* Main Container */}
            <div className='w-100 d-flex justify-content-center'>
                <div className='w-80 border bg-light p-3' style={{ width: '80%' }}>
                    {/* Header with Add Button and Search Bar */}
                    <div className='d-flex justify-content-between mb-3'>
                        <button className='btn btn-primary'
                            onClick={() => setShowModal(true)}>Add</button>
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search Employees..."
                            className='form-control w-50'
                        />
                        <Link to="/login">
                            <button className='btn btn-danger'>Logout</button>
                        </Link>
                    </div>
                    {/* Employee Table Component */}
                    <EmployeeTable
                        employees={employeesData?.employees || []} // Pass employees data
                        pagination={employeesData?.pagination || {}} // Pass pagination details
                        fetchEmployees={fetchEmployees} // Function to fetch employees
                        handleUpdateEmployee={handleUpdateEmployee} // Function to handle editing
                    />

                    {/* Add/Edit Employee Modal */}
                    <AddEmployee
                        fetchEmployees={fetchEmployees} // Function to refresh employee data
                        showModal={showModal}   // Modal visibility state
                        setShowModal={setShowModal} // Function to toggle modal visibility
                        employeeObj={employeeObj} // Employee object for editing
                    />
                </div>
            </div>
            {/* Toast Notifications for Alerts */}
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
};

export default EmployeeManagementApp;
