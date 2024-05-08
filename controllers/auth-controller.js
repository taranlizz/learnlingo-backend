import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

import { ctrlWrapper } from '../decorators/index.js';

import { HttpError } from '../helpers/index.js';

const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
    surname: newUser.surname,
    type: newUser.type,
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, `User with email ${email} is not found`);
  }

  const doesPasswordMatch = await bcrypt.compare(password, user.password);
  if (!doesPasswordMatch) {
    throw HttpError(401, `Incorrect password`);
  }

  const payload = { id: user._id, type: user.type };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

const getCurrent = async (req, res) => {
  const { username, email } = req.user;

  req.json({ username, email });
};

const signOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndDelete(_id, { token: '' });

  res.json({ message: 'Sign out succeed' });
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  signOut: ctrlWrapper(signOut),
};
