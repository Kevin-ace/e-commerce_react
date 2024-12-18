const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array(),
      message: 'Invalid input data' 
    });
  }

  const { username, email, password, firstName, lastName } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
      firstName,
      lastName
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role // Include role in payload
      }
    };

    // Sign JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ 
      message: 'Server error during registration',
      error: err.message 
    });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array(),
      message: 'Invalid input data. Please check your email and password format.' 
    });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid credentials. User not found.',
        field: 'email'
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: 'Invalid credentials. Incorrect password.',
        field: 'password'
      });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        email: user.email
      }
    };

    // Sign JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('Token generation error:', err);
          return res.status(500).json({ 
            message: 'Error generating authentication token',
            error: err.message 
          });
        }
        res.json({ 
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ 
      message: 'Server error during login',
      error: err.message 
    });
  }
});

// @route   GET /api/auth/user
// @desc    Get user data
router.get('/user', auth, async (req, res) => {
  try {
    // Find user by ID from the token, exclude password
    const user = await User.findById(req.user.id).select('-password');
    
    // If no user found
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return user data
    res.json(user);
  } catch (err) {
    console.error('Get User Error:', err.message);
    res.status(500).json({ 
      message: 'Server error while fetching user',
      error: err.message 
    });
  }
});

module.exports = router;