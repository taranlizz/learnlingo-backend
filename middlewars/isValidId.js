import { isValidObjectId } from 'mongoose';

import { HttpError } from '../helpers/index.js';

const isValidId = (req, res, next) => {
  const { teacherId } = req.params;
  if (!isValidObjectId(teacherId)) {
    return next(HttpError(404, `${teacherId} is not valid id`));
  }
  next();
};

export default isValidId;
