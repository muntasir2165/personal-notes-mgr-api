const express = require('express');
const router = express.Router();

router.post('/register', (req, res, next) => console.log('body:', req.body));
router.post('/login', (req, res, next) => console.log('body:', req.body));

module.exports = router;
