const express = require('express');
const router = express.Router();
const attendance = require('../controllers/attendance.controller');

router.post('/set', attendance.set);
router.post('/get', attendance.get);

module.exports = router;