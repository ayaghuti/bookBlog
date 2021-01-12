const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


const authUser = (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if(!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  // check for existing user
  User.findOne({ email })
    .then( user => {
      if(!user) return res.status(400).json({ message: 'User does not exist' });

// validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ message: 'Invalid Credentials'});

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              })
            }
          ); 
        })
    })
}

const getUser = (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
}

module.exports = {
  authUser,
  getUser
}