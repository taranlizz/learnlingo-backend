import teacherService from '../models/teachers/index.js';
import HttpError from '../helpers/HttpError.js';
import teacherSchemas from '../schemas/teacher-schemas.js';

const getAll = async (req, res, next) => {
  try {
    const result = await teacherService.getAllTeachers();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const result = await teacherService.getTeacherById(teacherId);
    if (!result) {
      throw HttpError(404, `Teacher with ${teacherId} is not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = teacherSchemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await teacherService.addTeacher(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = teacherSchemas.updateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { teacherId } = req.params;
    const result = await teacherService.updateTeacherById(teacherId, req.body);
    if (!result) {
      throw HttpError(404, `Teacher with ${teacherId} is not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  add,
  updateById,
};
