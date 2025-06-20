const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, (req, res) => {
  const userId = req.user.userId;
  res.json({ message: `Job created by user ${userId}` });
});

module.exports = router;
