import teacherService from '../models/teachers/index.js';
import HttpError from '../helpers/HttpError.js';
import { ctrlWrapper } from '../decorators/index.js';

const getAll = async (req, res) => {
  const result = await teacherService.getAllTeachers();
  res.json(result);
};

const getById = async (req, res) => {
  const { teacherId } = req.params;
  const result = await teacherService.getTeacherById(teacherId);
  if (!result) {
    throw HttpError(404, `Teacher with ${teacherId} is not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await teacherService.addTeacher(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { teacherId } = req.params;
  const result = await teacherService.updateTeacherById(teacherId, req.body);
  if (!result) {
    throw HttpError(404, `Teacher with ${teacherId} is not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { teacherId } = req.params;
  const result = await teacherService.deleteTeacherById(teacherId);
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
