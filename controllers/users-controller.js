import User from '../models/User.js';

import { HttpError, cloudinary } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const addAvatar = async (req, res) => {
  const { _id: userId } = req.user;

  const { public_id } = await cloudinary.uploader.upload(req.file.path, {
    folder: 'avatars',
  });

  const avatarURL = cloudinary.url(public_id, {
    transformation: [
      {
        quality: 'auto',
        fetch_format: 'auto',
      },
    ],
  });

  const result = await User.findByIdAndUpdate(
    userId,
    { avatarURL },
    { projection: { avatarURL: 1, _id: 0 }, returnDocument: 'after' }
  );

  console.log(result);

  if (!result) {
    throw new HttpError(`User with ${userId} is not found`);
  }

  res.status(200).send(result);
};

export default {
  addAvatar: ctrlWrapper(addAvatar),
};
