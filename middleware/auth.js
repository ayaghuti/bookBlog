const config = require('config');
const jwt = require('jsonwebtoken');


function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // check for token
  if(!token) return res.status(401).json({ message: 'No token, authorization denied'});

  //  Verify token 
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.user = decoded;
    next();    
  } catch (error) {
    res.json({ message: 'Token is not valid' });
  }
}

module.exports = auth;