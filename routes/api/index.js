const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/chains', require('./chain'));
router.use('/invent', require('./inventory'));

module.exports = router;