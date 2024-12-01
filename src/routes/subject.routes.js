import express from "express";
import {createCourse,getSubject,getAllSubjects,assignTeacherToCourse,addStudentsToCourse} from "../controllers/subject.controller.js"
const router = express.Router();


router.post("",createCourse);
router.get("",getAllSubjects);
router.get("/:subjectId",getSubject);
router.post("/teacher/:subjectId",assignTeacherToCourse);
router.post("/students/:subjectId",addStudentsToCourse);

export default router;
