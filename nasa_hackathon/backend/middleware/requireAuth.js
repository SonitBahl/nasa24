const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // Extract the URL path from the request
  const url = req.originalUrl;

  // Check if the request is for deleting a workout
  if (req.method === 'DELETE' && url.includes('/api/workouts/')) {
    // Skip authorization check for deleting workouts
    return next();
  }

  // Verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Ensure _id is a valid user ID
    req.user = await User.findById(_id).select('_id');
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = requireAuth;
