import bcrypt from 'bcrypt';
import { customAlphabet } from 'nanoid';

import User from '../models/User.js';

import { ctrlWrapper } from '../decorators/index.js';

import { HttpError, signJWT, sendEmail } from '../helpers/index.js';

const { BASE_URL } = process.env;

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12);

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  const token = signJWT(newUser._id);

  const result = await User.findByIdAndUpdate(
    newUser._id,
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

  if (!user.verified) {
    throw HttpError(401, `Email has not been verified`);
  }

  const doesPasswordMatch = await bcrypt.compare(password, user.password);
  if (!doesPasswordMatch) {
    throw HttpError(401, `Incorrect password`);
  }

  const token = signJWT(user._id);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(400, 'User not found or have already verified their email');
  }

  await User.findByIdAndUpdate(user._id, {
    verified: true,
    verificationCode: '',
  });

  res.json({ message: 'Email has been verified successfully' });
};

const resendVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, 'User not found');
  }
  if (user.verified) {
    throw HttpError(400, 'Email has already been verified');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: 'Email has been sent successfully' });
};

const changePasswordEmail = async (req, res) => {
  const { email } = req.body;

  const securityCode = nanoid();

  const user = await User.findOneAndUpdate({ email }, { securityCode });

  if (!user) {
    throw HttpError(404, 'User not found');
  }
  if (!user.verified) {
    throw HttpError(403, 'Email is not verified');
  }

  const changePasswordEmail = {
    to: email,
    subject: 'Password change',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/password/${user.securityCode}">Click to change your password</a>`,
  };

  await sendEmail(changePasswordEmail);

  res.json({ message: 'Email has been sent successfully' });
};

const changePassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { securityCode } = req.params;

  const user = await User.findOne({ securityCode });

  if (!user) {
    throw HttpError(400, 'Invalid security code');
  }

  const doesNewMatchConfirm = newPassword === confirmPassword ? true : false;

  if (!doesNewMatchConfirm) {
    throw HttpError(400, 'The new password and confirmation password do not match.');
  }

  const hashedPassword = await bcrypt.hash(confirmPassword, 10);

  await User.findByIdAndUpdate(user._id, { password: hashedPassword, securityCode: '' });

  res.json({
    message: 'Password has been updated successfully',
  });
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
  verify: ctrlWrapper(verify),
  resendVerification: ctrlWrapper(resendVerification),
  changePasswordEmail: ctrlWrapper(changePasswordEmail),
  changePassword: ctrlWrapper(changePassword),
  getCurrent: ctrlWrapper(getCurrent),
  signOut: ctrlWrapper(signOut),
};
