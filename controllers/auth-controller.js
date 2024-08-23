import bcrypt from 'bcrypt';

import User from '../models/User.js';

import { ctrlWrapper } from '../decorators/index.js';

import { HttpError, signJWT } from '../helpers/index.js';

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { _id: newUser_id } = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  const token = signJWT(newUser_id);

  const result = await User.findByIdAndUpdate(
    newUser_id,
    { token },
    { projection: { password: 0, createdAt: 0, updatedAt: 0 } }
  );

  res.status(201).json(result);
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

  const token = signJWT(user._id);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

const getCurrent = async (req, res) => {
  const { username, email } = req.user;

  res.json({ username, email });
};

const signOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.json({ message: 'Sign out succeed' });
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  signOut: ctrlWrapper(signOut),
};
