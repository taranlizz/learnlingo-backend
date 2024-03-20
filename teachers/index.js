import fs from "fs/promises";
import path from "path";

const teachersPath = path.resolve("teachers", "teachers.json");

export const getAllTeachers = async () => {
  const result = await fs.readFile(teachersPath, "utf-8");
  return JSON.parse(result);
};
