const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/emailController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/send-email', verifyToken, sendEmail);

module.exports = router;