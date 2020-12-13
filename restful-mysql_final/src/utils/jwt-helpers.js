const jwt = require('jsonwebtoken');

const jwtconfig = {
  access: 'reallysecretaccesssecret',
  refresh: 'reallysecretrefreshsecret',
};

const refreshTokens = [];

const generateAccessToken = (id, expiresIn) =>
  jwt.sign({ id }, jwtconfig.access, expiresIn);

const generateRefreshToken = (id, expiresIn) =>
  jwt.sign({ id }, jwtconfig.refresh, expiresIn);

const verifyToken = (token, secret, req, res) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    res.status(500).send({ auth: false, message: 'Invalid token.' });
  }
};

module.exports = {
  jwtconfig,
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};