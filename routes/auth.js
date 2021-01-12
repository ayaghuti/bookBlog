const express = require('express');
const authControllers = require('../controllers/authControllers');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.post('/', authControllers.authUser);

// @route   get auth/user
// @desc    get user data
// @access  private
router.get('/user', auth, authControllers.getUser);

module.exports = router;