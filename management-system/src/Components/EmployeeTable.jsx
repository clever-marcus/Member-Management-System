import React from 'react'
import { Link } from 'react-router-dom'
import { DeleteEmployeeById } from '../api';
import { notify } from '../utils';
import { PencilFill, Trash } from 'react-bootstrap-icons'

/**
 * EmployeeTable component renders a table displaying employee details with pagination
 * and supports actions like editing and deleting employees.
 * 
 * 
 * @ param {Array} employees - List of employee objects to display.
 * @ param {Object} pagination - Contains pagination details such as currentPage and totalPages.
 * @ param {Function} fetchEmployees - Function to fetch employee data, triggered during pagination or action.
 * 
 */

function EmployeeTable({
    employees, pagination,
    fetchEmployees, handleUpdateEmployee }) {
    const headers = ['Name', 'Email', 'Phone', 'Department', 'Actions']; // Table column headers
    const { currentPage, totalPages } = pagination; // Extracting pagination data

    // Navigates to the page if not already on the last page.
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePagination(currentPage + 1);
        }
    };

    // Navigates to the previous page if not already on the first page.
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1);
        }
    };

    /**
     * Handles pagination by fetching employees for the selected page.
     * 
     * @ param {number} currentPage - The page to fetch data for.
     */
    const handlePagination = (currentPage) => {
        fetchEmployees('', currentPage, 5)
    }

    /**
     * Handles the deletion of an employee by their ID.
     * @ param {string} id - The ID of the employee to delete. 
     */
    const handleDeleteEmployee = async (id) => {
        try {
            const { success, message } = await DeleteEmployeeById(id);
            if (success) {
                notify(message, 'success'); // NOtify success message
            } else {
                notify(message, 'error'); // Notify error message
            }
            fetchEmployees(); // Refresh employee list
        } catch (err) {
            console.error(err);
            notify('Failed to delete Employee', 'error') // Notify error on failure
        }
    }

    /**
     * 
     * TableRow component renders a single row for an employee.
     * @ params {Object} employee - Employee object containing details to display.
     */

    const TableRow = ({ employee }) => {
        return <tr>
            <td>
                <Link to={`/employee/${employee._id}`} className="text-decoration-none">
                    {employee.name}
                </Link>
            </td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.department}</td>
            <td>
                <i
                    className='text-warning me-4'
                    role="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Edit"
                    onClick={() => handleUpdateEmployee(employee)}
                ><PencilFill color='red'/></i>
                <i
                    className='text-danger'
                    role="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete"
                    onClick={() => handleDeleteEmployee(employee._id)}
                >
                    <Trash color='orange'/>
                </i>
            </td>
        </tr>
    }

    // Generate array of page numbers based on totalPages
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <>
            {/* Table for displaying employees */}
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {
                            headers.map((header, i) => (
                                <th key={i}>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.length === 0 ? <div> Data Not Found</div> // Message when no employees are available
                            : employees.map((emp) => (
                                <TableRow employee={emp} key={emp._id} />
                            ))
                    }
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center my-3">
                <span className="badge bg-primary">Page {currentPage} of {totalPages}</span>
                <div>
                    {/*Previous Page Button */}
                    <button
                        className="btn btn-outline-primary me-2"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pageNumbers.map(page => (
                        <button
                            key={page}
                            className={`btn btn-outline-primary me-1 ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePagination(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="btn btn-outline-primary ms-2"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

        </>
    )
}

export default EmployeeTable