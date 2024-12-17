// Secure User ID on Login

const User = require("../Models/User");

// Fetch user details by their ID
async function getUserById(req, res) {
    try {
        // Extract the user ID from the authenticated request object 
        const userId = req.user.id;

        // Find the user in the database by their ID
        const user = await User.findById({ userId });
        
        // If the user is not found, return a 404 (Not found) response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        };

        // If the user is found, return their details in the response
        res.json(user);
    } catch (error) {
        // Handle any server errors and return a 500 (Internal server error) response
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getUserById }