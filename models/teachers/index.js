import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const teachersPath = path.resolve('teachers', 'teachers.json');
const updateTeachers = teachers => fs.writeFile(teachersPath, JSON.stringify(teachers, null, 2));

const getAllTeachers = async () => {
  const result = await fs.readFile(teachersPath, 'utf-8');
  return JSON.parse(result);
};

const getTeacherById = async id => {
  const teachers = await getAllTeachers();
  const result = teachers.find(teacher => teacher.id === id);
  return result || null;
};

const addTeacher = async (name, surname) => {
  const teachers = await getAllTeachers();
  const newTeacher = {
    id: nanoid(),
    name,
    surname,
  };

  teachers.push(newTeacher);

  await updateTeachers(teachers);

  return newTeacher;
};

const updateTeacherById = async (id, data) => {
  const teachers = await getAllTeachers();
  const index = teachers.findIndex(teacher => teacher.id === id);
  if (index === -1) {
    return null;
  }
  teachers[index] = { id, ...data };
  await updateTeachers(teachers);
  return teachers[index];
};

const deleteById = async id => {
  const teachers = await getAllTeachers();
  const index = teachers.findIndex(teacher => teacher.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = teachers.splice(index, 1);
  await updateTeachers(teachers);
  return result;
};

export default {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacherById,
  deleteById,
};
