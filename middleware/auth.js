import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // sets req.user = { id: user._id }
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default auth;
