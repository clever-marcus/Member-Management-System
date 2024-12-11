const bcrypt = require('bcryptjs');
const User = require("../Models/User");
const { generateToken } = require("../utils/authUtils");

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found")
        }
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid Password");
        }

        // Generate a token
        const token = generateToken(user);
        res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token
        });
    } catch (error) {
        res.status(401).json({ message: "Invalid credentials" });
    }
}

module.exports = { login };