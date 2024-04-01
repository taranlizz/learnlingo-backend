import express from "express";
import teachers from "../../teachers/teachers.js";

const teachersRouter = express.Router();

teachersRouter.get("/", (req, res) => {
  res.json(teachers);
});

export default teachersRouter;
