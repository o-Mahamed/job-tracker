const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, (req, res) => {
  res.json({ message: `Job created by user ${req.user.userId}` });
});

module.exports = router;
