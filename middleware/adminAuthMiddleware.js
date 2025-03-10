const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};