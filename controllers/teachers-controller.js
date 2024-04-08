import teacherService from '../models/teachers/index.js';
import HttpError from '../helpers/HttpError.js';

const getAll = async (req, res, next) => {
  try {
    const result = await teacherService.getAllTeachers();
    result.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const result = await teacherService.getTeacherById(teacherId);
    if (!result) {
      throw HttpError(404, `Movie with ${teacherId} is not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
};
