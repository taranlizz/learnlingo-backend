import Teacher from '../models/Teacher.js';

import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getAll = async (req, res) => {
  const result = await Teacher.find({}, '-createdAt -updatedAt');
  res.json(result);
};

const getById = async (req, res) => {
  const { teacherId } = req.params;
  const result = await Teacher.findById(teacherId);
  if (!result) {
    throw HttpError(404, `Teacher with ${teacherId} is not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Teacher.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { teacherId } = req.params;
  const result = await Teacher.findByIdAndUpdate(teacherId, req.body);
  if (!result) {
    throw HttpError(404, `Teacher with ${teacherId} is not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { teacherId } = req.params;
  const result = await Teacher.findByIdAndDelete(teacherId);
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
