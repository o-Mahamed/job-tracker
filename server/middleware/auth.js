const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId: ... }
    next(); // continue to the protected route
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = authMiddleware;
