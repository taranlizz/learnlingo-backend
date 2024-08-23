import express from 'express';

import { upload, authenticate } from '../../middlewars/index.js';

import usersController from '../../controllers/users-controller.js';

const usersRouter = express.Router();

usersRouter.patch('/avatars', upload.single('avatar'), authenticate, usersController.addAvatar);

export default usersRouter;
