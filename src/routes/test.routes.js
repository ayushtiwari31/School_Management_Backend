import express from "express";

import { createTest } from "../controllers/test.controller.js";


const router=express.Router();

router.post("",createTest);

export default router;

