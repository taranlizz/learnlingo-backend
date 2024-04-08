import teacherService from '../models/teachers/index.js';

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
      const error = new Error(`Movie with ${id} is not found`);
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = 'Server error' } = error;
    res.status(status).json({ message });
  }
};

export default {
  getAll,
};
