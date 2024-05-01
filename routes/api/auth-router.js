import express from 'express';

import authController from '../../controllers/auth-controller.js';

import { isEmptyBody } from '../../middlewars/index.js';
import { validateBody } from '../../decorators/index.js';

import userSchemas from '../../schemas/user-schemas.js';

const authRouter = express.Router();

authRouter.post('/signup', isEmptyBody, validateBody(userSchemas.signUp), authController.signUp);

authRouter.post('/signin', isEmptyBody, validateBody(userSchemas.signIn), authController.signIn);

export default authRouter;
