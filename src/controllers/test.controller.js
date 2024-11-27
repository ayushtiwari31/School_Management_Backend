import { Test } from "../models/test.model.js";
import { Subject} from "../models/subject.model.js";
import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTest = asyncHandler(async (req, res) => {
    const { testName, courseCode, marks } = req.body;

    // Find course by course code
    const course = await Subject.findOne({ courseCode: courseCode.trim() });
    if (!course) {
        throw new ApiError(404, "Course not found with the given code");
    }

    // Process marks to map students and their scores
    const processedMarks = [];
    for (const mark of marks) {
        const { rollNo, name, score } = mark;

        // Find student by roll number and name
        const student = await Student.findOne({ rollNo: rollNo.trim(), name: name.trim() });
        if (!student) {
            throw new ApiError(404, `Student not found with rollNo: ${rollNo} and name: ${name}`);
        }

        // Add the student and score to processed marks
        processedMarks.push({
            student: student._id,
            score,
        });
    }

    // Create the test with the mapped data
    const test = await Test.create({
        testName,
        course: course._id,
        marks: processedMarks,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, "Test created successfully", test));
});
