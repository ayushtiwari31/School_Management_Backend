import express from "express";
import {createCourse,getAllSubjects,assignTeacherToCourse,addStudentsToCourse} from "../controllers/subject.controller.js"
const router = express.Router();


router.post("",createCourse);
router.get("",getAllSubjects);
router.put("/teacher",assignTeacherToCourse);
router.put("/students",addStudentsToCourse);

export default router;
