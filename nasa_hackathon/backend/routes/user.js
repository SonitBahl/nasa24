const express = require('express');
const requireAuth = require('../middleware/requireAuth'); // Import the authentication middleware
const { loginUser, signupUser, updatePassword } = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// update password route with authentication
router.post('/updatePassword', updatePassword);

module.exports = router;
