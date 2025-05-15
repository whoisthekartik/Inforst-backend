const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontroller');
const { register, walletLogin, getProfile } = require('../controllers/authcontroller');

router.get('/register', (req, res) => {
  res.send('This is the /register endpoint. Use POST to register a user.');
});

// POST /api/auth/register
router.post('/register',authcontroller.register);

// POST /api/auth/login
router.post('/login', authcontroller.walletLogin);

// GET /api/auth/profile
router.get('/profile', authcontroller.getProfile);

module.exports = router;


