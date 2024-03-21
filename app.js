import {
  addTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacherById,
  deleteById,
} from "./teachers/index.js";

const invokeAction = async ({ action, id, name, surname }) => {
  switch (action) {
    case "list":
      const teachers = await getAllTeachers();
      return console.log(teachers);
    case "getById":
      const teacher = await getTeacherById(id);
      return console.log(teacher);
    case "add":
      const newTeacher = await addTeacher(name, surname);
      return console.log(newTeacher);
    case "updateById":
      const updatedTeacher = await updateTeacherById(id, { name, surname });
      return console.log(updatedTeacher);
    case "deleteById":
      const deletedTeacher = await deleteById(id);
      return console.log(deletedTeacher);
    default:
      console.log("Unknown action");
  }
};

invokeAction({ action: "deleteById", id: "LRqVcCY-MWOxrp5OVmRWC" });
