import express from "express";
import cors from "cors";
import teachersRouter from "./routes/api/teachers-router.js";

const app = express();

app.use(cors());

app.use("/api/teachers", teachersRouter);

app.listen(3000, () => console.log("Server running on 3000 PORT"));
