const axios = require('axios');
const bcrypt = require('bcryptjs');
const usersDB = require('../database/dbConfig');
const jwt = require('jsonwebtoken');

const { authenticate, jwtKey } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  const {username, password} = req.body;
  if (!username | !password) {
    return res.status(404).json({errorMessage: "Please provide a password and a username"});
  }
  try {
    const foundUser = await usersDB('users').where({username}).first();
    if (foundUser) {
      res.status(500).json({errorMessage: "Username is already taken."})
    } else {
      bcrypt.hash(password, 11).then(async (hash) => {
        const newUser = { username, password: hash }
        const [id] = await usersDB('users').insert(newUser);
        const token = jwt.sign({userId: id, username}, jwtKey, { expiresIn: '1hr'});
        res.status(201).json({token, expiresIn: 60, user: {username , id}})
      }).catch((err) => {
        console.log(err);
        res.status(500).json({errorMessage: "Could not register the new user."})
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({errorMessage: "Could not register the new user."})
  }
}

async function login(req, res) {
  const {username, password} = req.body;
  if (!username | !password) {
    return res.status(404).json({errorMessage: "Please provide a password and a username"});
  }
  const foundUser = await usersDB('users').where({username}).first();
  if (!foundUser) {
    return res.status(500).json({errorMessage: "Could not authenticate user."})
  }
  try {
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(500).json({errorMessage: "Could not authenticate user."})
    } else {
      const token = jwt.sign({userId: foundUser.id, username}, jwtKey, { expiresIn: '1hr'});
      res.status(201).json({token, expiresIn: 60, user: {username , id: foundUser.id}})
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({errorMessage: "Could not authenticate user."})
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
