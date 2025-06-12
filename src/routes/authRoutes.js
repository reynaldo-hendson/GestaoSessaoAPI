const express = require('express');
const { login } = require('../api/controllers/authController');
const router = express.Router();
router.post('/login', login);
module.exports = router;
