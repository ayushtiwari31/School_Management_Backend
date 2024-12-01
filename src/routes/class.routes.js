import express from "express";

import {createClass,getAllClassSubjects ,addStudentsToBranchByCode,getAllClasses,getClassById} from "../controllers/class.controller.js";

const router = express.Router();

router.post("",createClass);
router.post("/students",addStudentsToBranchByCode);
router.get("",getAllClasses);
router.get("/:id",getClassById);
router.get("/subjects/:classId", getAllClassSubjects);


export default router;