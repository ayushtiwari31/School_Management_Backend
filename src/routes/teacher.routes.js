import express from "express";
import { createTeacher,getAllTeachers,getTeacherById,updateTeacher, deleteTeacher,addCourseToTeacher,} from "../controllers/teacher.controller.js";


 const router =express.Router();

 router.post("",createTeacher);
 router.get("",getAllTeachers);
 router.get("/:id",getTeacherById);
 router.put("/:id",updateTeacher);
 router.delete("/:id",deleteTeacher);
 router.put("/:teacherId/:courseId", addCourseToTeacher);


 export default router;