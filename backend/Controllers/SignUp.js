const User = require("../Models/User");

const bcrypt = require("bcryptjs");

/*
 * Controller function to handle user signup.
 * @ param {Object} req - Express request object containing user data in the body.
 * @ param {Object} res - Express response object to send responses back to the client.
 */

async function signupUser(req, res) {
    try {
        // Destructure user details from the request body
        const { firstName, lastName, email, password } = req.body;

        // Validate that all required fields are provided
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fileds are required" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword, // Store the hashed password
            role: "client" // Default role for a new user
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send success response with the created user's details
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(400).json({ message: error.message || "An error occured during user registration" })
    }
};
// Exports the signupUser function for use in routes
module.exports = { signupUser };