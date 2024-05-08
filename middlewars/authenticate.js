import jwt from 'jsonwebtoken';

import { HttpError } from '../helpers/index.js';

import User from '../models/User.js';

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, 'Authorization header is not found'));
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Authorization required'));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || !user.token !== token) {
      throw HttpError(401, 'Authorization required');
    }
    if (user.type !== 'teacher') {
      throw HttpError(403, 'Invalid user type');
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = !error.status ? 401 : error.status;
    return next(HttpError(error.status, error.message));
  }
};
export default authenticate;
