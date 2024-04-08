import teacherService from '../models/teachers/index.js';
import HttpError from '../helpers/HttpError.js';

const getAll = async (req, res) => {
  try {
    const result = await teacherService.getAllTeachers();
    result.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const result = await teacherService.getTeacherById(teacherId);
    if (!result) {
      throw HttpError(404, `Movie with ${teacherId} is not found`);
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = 'Server error' } = error;
    res.status(status).json({ message });
  }
};

export default {
  getAll,
  getById,
};
