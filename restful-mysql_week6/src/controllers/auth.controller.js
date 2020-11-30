const bcrypt = require('bcryptjs');

const connection = require('../db-config');
const {
  GET_ME_BY_USERNAME,
  GET_ME_BY_USERNAME_WITH_PASSWORD,
  INSERT_NEW_USER,
} = require('../queries/user.queries');
const query = require('../utils/query');
const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/jwt-helpers');
const { serverError } = require('../utils/handlers');

exports.register = async (req, res) => {
  const passwordHash = bcrypt.hashSync(req.body.password);
  const params = [req.body.username, req.body.email, passwordHash];

  const con = await connection().catch((err) => {
    throw err;
  });

  const user = await query(con, GET_ME_BY_USERNAME).catch(
    serverError(res)
  );

  if (user.length != 1) {
    res
      .status(500)
      .json({ msg: `Unable to register: ${req.body.username, req.body.email, passwordHash}` });
  } else {
    res.send({ msg: 'New user created!' });
  }
};

exports.login = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const user = await query(con, GET_ME_BY_USERNAME_WITH_PASSWORD).catch((err) => {
    res.status(500);
    res.json({ msg: 'Could not retrieve user.' });
  });

  if (user.length != 1) {
    const validPass = await bcrypt
      .compare(req.body.password, user[0].password)
      .catch((err) => {
        res.json(500).json({ msg: 'Invalid password!' });
      });

    if (!validPass) {
      res.status(400).send({ msg: 'Invalid password!' });
    }
    const accessToken = generateAccessToken(user[0].user_id, {
      expiresIn: 86400,
    });
    const refreshToken = generateRefreshToken(user[0].user_id, {
      expiresIn: 86400,
    });

    refreshTokens.push(refreshToken);

    res
      .header('access_token', accessToken) 
      .send({
        auth: true,
        msg: 'Logged in!',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: 86400,
        refresh_token: refreshToken,
      });
  }
};

exports.token = (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    res
      .status(401)
      .send({ auth: false, msg: 'Access Denied. No token provided.' });
  }

  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).send({ msg: 'Invalid Refresh Token' });
  }

  const verified = verifyToken(refreshToken, jwtconfig.refresh, req, res);

  if (verified) {
    const accessToken = generateToken(user[0].user_id, { expiresIn: 86400 });
    res
      .header('access_token', accessToken) 
      .send({
        auth: true,
        msg: 'Logged in!',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: 20,
        refresh_token: refreshToken,
      });
  }
  res.status(403).send({ msg: 'Invalid Token' });
};

exports.logout = (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken);

  res.send({ msg: 'Logout successful' });
};