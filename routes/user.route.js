const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');

router.get('/test', user.test);

router.get('/', user.all);

router.get('/:userid', user.one);

router.post('/create', user.create);

router.put('/update/:userid', user.update);

router.delete('/delete/:userid', user.delete);

module.exports = router;