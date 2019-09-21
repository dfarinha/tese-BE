const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/chain', require('./chain'));

module.exports = router;