import fs from 'fs/promises';
import path from 'path';

import User from '../models/User.js';

import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const avatarsPath = path.resolve('public', 'avatars');

const addAvatar = async (req, res) => {
  const { _id: userId } = req.user;

  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);

  const avatar = path.join('avatars', filename);

  const result = await User.findByIdAndUpdate(
    userId,
    { avatar },
    { projection: { avatar: 1 }, returnDocument: 'after' }
  );

  if (!result) {
    throw new HttpError(`User with ${userId} is not found`);
  }

  res.status(200).send(result);
};

export default {
  addAvatar: ctrlWrapper(addAvatar),
};
