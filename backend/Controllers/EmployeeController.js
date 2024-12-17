const EmployeeModel = require("../Models/Employee.Model");


    // Create a new employee Function
    const createEmployee = async (req, res) => {
        try {
            // Extract the request body
            const body = req.body;
            
            // Chekc if a file (profile image) was uploaded and add its path to the body 
            const profileImage = req?.file ? req?.file?.path : null;
            body.profileImage = profileImage;

            // Create a new employee instance using the body data
            const emp = new EmployeeModel(body);
    
            // Save the employee to the database
            await emp.save();

            // Send a success response
            res.status(201)
                .json({
                    message: 'Employee Created',
                    success: true
                });
        } catch (err) {
            // Log the error and send a 500 response
            console.log('Error ', err);
            res.status(500).json({
                message: 'Internal Server Error',
                success: false,
                error: err
            })
        }
    }
    // Get all employees with pagination and search functionality
    const getAllEmployees = async (req, res) => {
        try {
            // Extract query parameters for pagination and search
            let { page, limit, search } = req.query;
    
            // Set default values if page or limit are not provided
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
    
            // Calculate the number of documents to skip
            const skip = (page - 1) * limit;
    
            // Build the search criteria for filtering by name
            let searchCriteria = {};
            if (search) {
                searchCriteria = {
                    name: {
                        $regex: search,
                        $options: 'i' // case insensitive search
                    }
                }
            }
            // Get the total count of employees matching the search criteria
            const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);
    
            // Fetch the employees with pagination and sorting by updateAt (descending)
            const emps = await EmployeeModel.find(searchCriteria)
                .skip(skip)
                .limit(limit)
                .sort({ updatedAt: -1 });
    
            // Calculate total pages for pagination
            const totalPages = Math.ceil(totalEmployees / limit);
    
            // Send a success response with employee data and pagination info
            res.status(200)
                .json({
                    message: 'All Employees',
                    success: true,
                    data: {
                        employees: emps,
                        pagination: {
                            totalEmployees,
                            currentPage: page,
                            totalPages,
                            pageSize: limit
                        }
                    }
                });
        } catch (err) {
            // Log the error and send a 500 response
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error',
                success: false,
                error: err
            });
        }
    };
    
    // Get details of a single employee by their ID Function
    const getEmployeeById = async (req, res) => {
        try {
            // Extract the employee ID from request parameters
            const id = req.params.id;

            // Find the employee by ID in the database
            const emp = await EmployeeModel.findOne({ _id: id });

            // Send a success response with employee details
            res.status(200)
                .json({
                    message: 'Employee Details',
                    success: true,
                    data: emp
                });
        } catch (err) {
            // Log the error and send a 500 response
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error',
                success: false,
                error: err
            })
        }
    }
    
    // Delete an existing employee by their ID function
    const deleteEmployeeById = async (req, res) => {
        try {
            // Extract the employee ID from request parameters
            const id = req.params.id;

            // Delete the employee from the database
            await EmployeeModel.deleteOne({ _id: id });

            // Send a success response
            res.status(200)
                .json({
                    message: 'Employee Deleted Successfully',
                    success: true
                });
        } catch (err) {
            // Log the error and send a 500 response
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error',
                success: false,
                error: err
            })
        }
    }
    
    // Update an employee's details by their ID function
    const updateEmployeeById = async (req, res) => {
        try {
            // Extract the employee ID from request parameters
            const { id } = req.params;

            // Extract the updated data from request body
            const { name, email, phone, department, salary } = req.body;
            
            // Build the update data object
            let updateData = {
                name, email, phone, department, salary, updatedAt: new Date() // Update the timestamp
            };
            console.log('<-- update ---> ', req.file)

            // If a new profile image is uploaded, add its path to the update data
            if (req.file) {
                updateData.profileImage = req.file.path;
            }
            // FInd the employee by ID and update their details
            const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true } // Return the updated document
            );
    
            // If no employee is found, send a 404 reponse
            if (!updatedEmployee) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            // Send a success reponse with updated employee details
            res.status(200)
                .json({
                    message: 'Employee Updated Successfully',
                    success: true,
                    data: updatedEmployee
                });
        } catch (error) {
            // Log the error and send a 500 response
            res.status(500).json({ message: error.message });
        }
    }
    
    // Export all the functions
    module.exports = {
        createEmployee,
        getAllEmployees,
        getEmployeeById,
        deleteEmployeeById,
        updateEmployeeById
    }


