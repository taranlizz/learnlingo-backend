import User from '../models/User.js';

import { ctrlWrapper } from '../decorators/index.js';

import { HttpError } from '../helpers/index.js';

const signup = async (res, req) => {};

export default {
  signup: ctrlWrapper(signup),
};
