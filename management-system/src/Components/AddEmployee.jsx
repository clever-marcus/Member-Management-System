import React, { useEffect, useState } from 'react'
import { notify } from '../utils';
import { CreateEmployee, UpdateEmployeeById } from '../api';

function AddEmployee({
    showModal, // Boolean to show or hide the modal
    setShowModal, // Function to toggle modal visibility
    fetchEmployees, // Function to refresh the employee list
    employeeObj // Object containing employee data for updating
}) {
    // State to manage employee form data
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null
    });
    // State to track if the modal is in update mode
    const [updateMode, setUpdateMode] = useState(false);

    // Effect to populate form data when an employee object is passed
    useEffect(() => {
        if (employeeObj) {
            setEmployee(employeeObj); // Set the form fields with employee data
            setUpdateMode(true); // Enable update mode
        }
    }, [employeeObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, profileImage: e.target.files[0] });
    };
    // Function to reset the employee form to initial state
    const resetEmployeeStates = () => {
        setEmployee({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
            profileImage: null,
        })
    }
    // function to handle form submission for adding or updating an employee
    const handleAddEmployee = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Call the appropriate API function bsed on update mode
            const { success, message } = updateMode ?
                await UpdateEmployeeById(employee, employee._id) // Update employee
                : await CreateEmployee(employee);  // Create employee
            console.log('create OR update ', success, message);
            // Notify the user of success or failure
            if (success) {
                notify(message, 'success') // Success notification
            } else {
                notify(message, 'error') // Error notification
            }
            // Colse the modal and reset states
            setShowModal(false);
            resetEmployeeStates();
            fetchEmployees(); // Refresh the employee list
            setUpdateMode(false); // Exit update mode
        } catch (err) {
            console.error(err); // Log the error
            notify('Failed to create Employee', 'error') // Notify the user of failure
        }
    }
    // Function to handle modal close action
    const handleModalClose = () => {
        setShowModal(false); // Close the modal
        setUpdateMode(false); // Exit update mode
        resetEmployeeStates(); // Reset the form fields
    }
    return (
        < div className={`modal ${showModal ? 'd-block' : ''}` // Conditionally show modal
        } tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> {
                            updateMode ? 'Update Employee' : 'Add Employee'
                        }</h5>
                        <button type="button" className="btn-close"
                            onClick={() => handleModalClose()}>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddEmployee}> {/*Form submission handler */}
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange} // Update name field
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange} // Update email field
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={employee.phone}
                                    onChange={handleChange} // Update phone field
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Department</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="department"
                                    value={employee.department}
                                    onChange={handleChange} // Update department field
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Salary</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="salary"
                                    value={employee.salary}
                                    onChange={handleChange} // Update salary field
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Profile Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="profileImage"
                                    onChange={handleFileChange} // Update profile image
                                />
                            </div>
                            <button type="submit"
                                className="btn btn-primary">
                                {updateMode ? 'Update' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default AddEmployee