import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/env.js"
import User from "../models/user.model.js"

export const Authorize = async (req, res, next) => {
  try {
    let token;

    // Check if the token exists in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user by ID from the token payload
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // Attach the user object to the request for further access in the route
    req.user = user;

    next();  // Proceed to the next middleware/route handler
  } catch (error) {
    let message = 'Unauthorized';

    if (error.name === 'JsonWebTokenError') {
      message = 'Invalid token';
    } else if (error.name === 'TokenExpiredError') {
      message = 'Token expired';
    }

    res.status(401).json({ message, error: error.message });
  }
}
