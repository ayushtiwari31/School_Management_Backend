import { Class } from "../models/class.model.js";
import { Classes } from "../models/classes.model.js";
import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const createClass= asyncHandler(async (req, res) => {
    const { className, section} = req.body;

    
    const existingBranch = await Class.findOne({ className,section });
    if (existingBranch) {
        throw new ApiError(400, "Branch with this year already exists");
    }

    const newClass = await Class.create({ className, section });


    return res
        .status(201)
        .json(
            new ApiResponse(201, "Class created successfully ", {
                class: newClass,
            })
        );
});

export const getAllClasses=asyncHandler(async (req,res) => {
    const classes=await Class.find();

    if (!classes || classes.length === 0) {
        return res.status(404).json(new ApiResponse(404, 'No classes found',classes));
    }

    return res.status(200).json(new ApiResponse(200, 'Classes retrieved successfully', classes));
})

export const getClassById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const classDetails = await Class.findById(id).populate({
        path: 'students',
        select: 'name rollNo gender registrationNumber', // Select desired fields
    });

    if (!classDetails) {
        return res.status(404).json(new ApiResponse(404, 'Class not found', null));
    }

    return res.status(200).json(new ApiResponse(200, 'Class details retrieved successfully', classDetails));
});


export const addStudentsToBranchByCode = asyncHandler(async (req, res) => {
    const { className,section} = req.body; // Branch code from URL params
    const {studentsData }= req.body; // Array of students data

    // Check if the data is an array
    if (!Array.isArray(studentsData) || studentsData.length === 0) {
        throw new ApiError(400, "Invalid input: Array of students is required");
    }

    // Find the branch by its code
    const branch = await Class.findOne( { className,section });
    if (!branch) {
        throw new ApiError(404, "Branch not found with the given code");
    }

    // Process each student in the array
    const createdStudents = [];
    for (const studentData of studentsData) {
        const { name, rollNo, registrationNumber, gender } = studentData;

        // Create a new student
        const student = await Student.create({
            name, 
            rollNo, 
            registrationNumber, 
            gender 
        });

        // Add the student ID to the branch's students array
        branch.students.push(student._id);
        createdStudents.push(student);
    }

    // Save the updated branch
    await branch.save();

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Students added to branch successfully", {
                branch,
                createdStudents,
            })
        );
});
