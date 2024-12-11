const User = require("../Models/User");

const bcrypt = require("bcryptjs");

async function signupUser(req, res) {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fileds are required" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: "client"
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send success response
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(400).json({ message: error.message || "An error occured during user registration" })
    }
};

module.exports = { signupUser };