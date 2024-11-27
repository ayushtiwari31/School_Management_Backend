import express from "express";
import {createCourse,assignTeacherToCourse,addStudentsToCourse} from "../controllers/subject.controller.js"
const router = express.Router();


router.post("",createCourse);
router.put("/teacher",assignTeacherToCourse);
router.put("/students",addStudentsToCourse);

export default router;
