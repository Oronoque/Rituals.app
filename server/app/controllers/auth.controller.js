const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models');

const SECRET = 'mySecret';
const saltRounds = 10;

async function comparePassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

function generateToken(userId, email) {
  const payload = {
    userId,
    email,
  };

  const token = jwt.sign(payload, SECRET);

  return token;
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'missing_parameters' });
  }

  try {
    const userDB = await db.users.scope('auth').findOne({
      where: {
        email,
      },
    });

    if (!userDB) {
      return res.status(401).json({ success: false });
    }

    const passwordValidation = await comparePassword(password, userDB.password);

    if (!passwordValidation) {
      // If the user is not found, return an error response
      return res.status(401).json({ success: false });
    }

    const newToken = generateToken(userDB.id, userDB.email);

    // If the user is found, return a success response
    return res.status(200).json({ success: true, data: userDB, token: newToken });
  } catch (error) {
    console.log('error:', error);
    return res.json({ success: false });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check the good params
    if (!email || !password) {
      return res.status(400).json({ error: 'missing_parameters' });
    }

    // check in DB if email already exists
    const userEmailDB = await db.users.findOne({ where: { email } });

    if (userEmailDB) {
      return res.status(400).json({ error: 'email_already_exists' });
    }

    const hashedPassword = await hashPassword(password);

    const createdUser = await db.users.create(
      {
        email,
        password: hashedPassword,
      },
      { returning: true },
    );

    const newToken = generateToken(createdUser.id, createdUser.email);

    // Send success message
    return res.status(201).json({ success: true, data: createdUser, token: newToken });
  } catch (error) {
    console.log('error:', error);
    return res.json({ success: false });
  }
};

exports.ping = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(400).json({ error: 'missing_parameters' });
    }

    const decoded = jwt.verify(token, SECRET);
    const userId = decoded.userId;

    const userDB = await db.users.findOne({
      where: { id: userId },
    });

    if (userDB) {
      return res.send({ success: true, data: userDB });
    }

    return res.status(401).json({ error: 'invalid_token' });
  } catch (error) {
    return res.status(401).json({ error: 'invalid_token' });
  }
};
