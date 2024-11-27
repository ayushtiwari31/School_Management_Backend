import express from "express";

import {createClass ,addStudentsToBranchByCode,getAllClasses,getClassById} from "../controllers/class.controller.js";

const router = express.Router();

router.post("",createClass);
router.post("/students",addStudentsToBranchByCode);
router.get("",getAllClasses);
router.get("/:id",getClassById);


export default router;