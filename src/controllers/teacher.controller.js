import mongoose, { isValidObjectId } from "mongoose";
import { Teacher } from "../models/teacher.model.js";
import { Subject } from "../models/subject.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new teacher
export const createTeacher = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { name, email } = req.body;

   
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
        throw new ApiError(400, "A teacher with this email already exists");
    }

    const teacher = await Teacher.create({ name, email });

    return res
        .status(201)
        .json(new ApiResponse(201, "Teacher created successfully", teacher));
});




// Get a teacher by ID
export const getTeacherById = asyncHandler(async (req, res) => {
    const { teacherId } = req.params;

    if (!isValidObjectId(teacherId)) {
        throw new ApiError(400, "Invalid teacher ID");
    }

    const teacher = await Teacher.findById(teacherId).populate("subjects");
    if (!teacher) {
        throw new ApiError(404, "Teacher not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Teacher retrieved successfully", teacher));
});




// Update a teacher's information
export const updateTeacher = asyncHandler(async (req, res) => {
    const { teacherId } = req.params;
    const { name, email } = req.body;

    if (!isValidObjectId(teacherId)) {
        throw new ApiError(400, "Invalid teacher ID");
    }

    const teacher = await Teacher.findByIdAndUpdate(
        teacherId,
        { name, email },
        { new: true, runValidators: true }
    );

    if (!teacher) {
        throw new ApiError(404, "Teacher not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Teacher updated successfully", teacher));
});




// Delete a teacher
export const deleteTeacher = asyncHandler(async (req, res) => {
    const { teacherId } = req.params;

    if (!isValidObjectId(teacherId)) {
        throw new ApiError(400, "Invalid teacher ID");
    }

    const teacher = await Teacher.findByIdAndDelete(teacherId);

    if (!teacher) {
        throw new ApiError(404, "Teacher not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Teacher deleted successfully"));
});




export const addCourseToTeacher = asyncHandler(async (req, res) => {
    const { teacherId, courseId } = req.params;

    if (!isValidObjectId(teacherId) || !isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid teacher or course ID");
    }

    const teacher = await Teacher.findById(teacherId);
    const course = await Subject.findById(courseId);

    if (!teacher) {
        throw new ApiError(404, "Teacher not found");
    }
    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    // Add course reference to teacher's courses array
    if (!teacher.courses.includes(courseId)) {
        teacher.courses.push(courseId);
        await teacher.save();
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Course added to teacher successfully", teacher));
});
