import { getAllTeachers } from "./teachers/index.js";

const invokeAction = async ({ action }) => {
  switch (action) {
    case "list":
      const teachers = await getAllTeachers();
      console.log(teachers);
      break;
    default:
      console.log("Unknown action");
  }
};

invokeAction({ action: "list" });
