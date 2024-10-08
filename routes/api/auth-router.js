import express from 'express';

import authController from '../../controllers/auth-controller.js';

import { authenticate, isEmptyBody } from '../../middlewars/index.js';
import { validateBody } from '../../decorators/index.js';

import userSchemas from '../../schemas/user-schemas.js';

const authRouter = express.Router();

authRouter.post('/signup', isEmptyBody, validateBody(userSchemas.signUp), authController.signUp);

authRouter.get('/verify/:verificationCode', authController.verify);

authRouter.post(
  '/verify',
  isEmptyBody,
  validateBody(userSchemas.email),
  authController.resendVerification
);

authRouter.post('/signin', isEmptyBody, validateBody(userSchemas.signIn), authController.signIn);

authRouter.post(
  '/password',
  isEmptyBody,
  validateBody(userSchemas.email),
  authController.changePasswordEmail
);

authRouter.patch(
  '/password/:securityCode',
  isEmptyBody,
  validateBody(userSchemas.changePassword),
  authController.changePassword
);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/signout', authenticate, authController.signOut);

export default authRouter;
