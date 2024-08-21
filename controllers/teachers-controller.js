import Teacher from '../models/Teacher.js';

import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getAll = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;

  const skip = (page - 1) * limit;
  const total = await Teacher.countDocuments({});

  const result = await Teacher.find({}, '-createdAt -updatedAt -userId', { skip, limit });

  res.json({ result, total });
};

const getById = async (req, res) => {
  const { teacherId } = req.params;
  const { _id: userId } = req.user;
  const result = await Teacher.findOne({ _id: teacherId, userId });
  if (!result) {
    throw HttpError(404, `Teacher with ${teacherId} is not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: userId } = req.user;

  const result = await Teacher.create({ ...req.body, userId });

  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { teacherId } = req.params;
  const { _id: userId } = req.user;
  const result = await Teacher.findOneAndUpdate({ _id: teacherId, userId }, req.body);
  if (!result) {
    throw HttpError(404, `Teacher with ${teacherId} is not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { teacherId } = req.params;
  const { _id: userId } = req.user;
  const result = await Teacher.findByOneAndDelete({ _id: teacherId, userId });
  if (!result) {
    throw HttpError(404, `Teacher with ${teacherId} is not found`);
  }
  res.status(204).send();
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
