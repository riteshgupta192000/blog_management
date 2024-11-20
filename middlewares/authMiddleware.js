const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.status(400).json({ message: 'Invalid token' });
  }
};



exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization'];
  console.log('Token:', token); // Log the token for debugging
  if (!token) return res.redirect('/login');

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.redirect('/login');
    req.user = await User.findById(decoded.id); // Attach user data to the request object
    console.log('Verified user:', req.user); // Log the user
    next();
  });
};
