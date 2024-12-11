// Import the required modules
const jwt = require("jsonwebtoken");
const { secretkey } = require("../config/jwtConfig");

/**
 * Middleware to authenticate a JWT token from the Authorization header.
 *
 * @ param {Object} req - The request object, containing headers and other data.
 * @ param {Object} res - The response object, used to send responses to the client.
 * @ param {Function} next - The next middleware function in the stack.
 *
 * This function:
 * 1. Extracts the Authorization header from the request.
 * 2. Validates the token format (must be "Bearer <token>").
 * 3. Verifies the token using the secret key.
 * 4. Calls `next()` if the token is valid or sends an appropriate error response if invalid.
 */

function authenticateToken(req, res, next) {
    // Extract the Authorization header from the request
    const authHeader = req.header("Authorization");
    // Check if the Authorization header is missing
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    // Split the header into 'Bearer' and the token parts
    const [bearer, token] = authHeader.split(" ");

    // Validate thr token format
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    // Verify the token format
    jwt.verify(token, secretkey, (err, user) => {
        if (err) {
            // Token is invalid or expired
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        // Proceed to the next middleware
        next();
    })
}

// Export the middleware function for use in other parts of the application
module.exports = { authenticateToken };