import express from 'express';

import { upload, authenticate } from '../../middlewars/index.js';

import usersController from '../../controllers/users-controller.js';

const usersRouter = express.Router();

usersRouter.patch('/avatar', authenticate, upload.single('avatar'), usersController.addAvatar);

export default usersRouter;
