import { Subject } from "../models/subject.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Teacher } from "../models/teacher.model.js";
import {Student} from "../models/student.model.js"
import { Class } from "../models/class.model.js";

export const createCourse = asyncHandler(async (req, res) => {
    const { classId } = req.query;
    const { subjectName, subjectCode } = req.body; 

    
    if (!classId) {
        throw new ApiError(400, "classId is required");
    }

   
    if (!subjectName) {
        throw new ApiError(400, "SubjectName is required");
    }

    // Check if a course with the same code already exists
    const existingCourse = await Subject.findOne({ subjectCode: subjectCode.trim() });
    if (existingCourse) {
        throw new ApiError(400, "Course with this code already exists");
    }

    // Create the course
    const course = await Subject.create({ subjectName, subjectCode });

    
    const classDocument = await Class.findById(classId);
    if (!classDocument) {
        throw new ApiError(404, "Class not found");
    }

    // Add the course ID to the subjects array in the Class document
    classDocument.subjects.push(course._id);
    await classDocument.save();

    // Return success response
    return res.status(201).json(new ApiResponse(201, "Course created and added to the class successfully", { course, class: classDocument }));
});


export const getAllSubjects=asyncHandler(async (req,res) => {
    const subjects = await Subject.find()
        .populate('teacher', 'name email') // Populate teacher's name and email
        .populate('students', 'name email') // Populate students' name and email
        .populate('tests', 'testName date');

    if (!subjects || subjects.length === 0) {
        return res.status(404).json(new ApiResponse(404, 'No Subjects found',subjects));
    }

    return res.status(200).json(new ApiResponse(200, 'Subjects retrieved successfully', subjects));
})

// Assign a teacher to a course or create a new course if it doesn't exist
export const assignTeacherToCourse = asyncHandler(async (req, res) => {
    const { subjectCode, subjectName, name, email } = req.body;

    // Validate inputs
    if (!subjectCode || !subjectName || !name || !email) {
        throw new ApiError(400, "Missing required fields");
    }

    // Find or create the teacher based on email
    let teacher = await Teacher.findOne({ email });
    if (!teacher) {
        teacher = await Teacher.create({ name: name, email: email });
    }

    // Find or create the course based on course code
    let course = await Subject.findOne({ subjectCode,subjectName });
    if (!course) {
        // If course doesn't exist, create a new course
        course = await Subject.create({ courseCode, courseName });
    }

    // Assign the teacher to the course if not already assigned
    if (!course.teacher || course.teacher.toString() !== teacher._id.toString()) {
        course.teacher = teacher._id;
        await course.save();
    }

    // Add the course to the teacher's courses array if not already present
    if (!teacher.subjects.includes(course._id)) {
        teacher.subjects.push(course._id);
        await teacher.save();
    }

    // Return success response with course and teacher info
    return res.status(200).json(new ApiResponse(200, "Teacher assigned to course successfully", { course, teacher }));
});



export const addStudentsToCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { students } = req.body; // Array of { name, rollNo }

    // Validate course ID
    if (!mongoose.isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid course ID");
    }

    // Check if the course exists
    const course = await Subject.findById(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    // Process each student
    for (const { name, rollNo } of students) {
        let student = await Student.findOne({ rollNo });

        // Create a new student if they don't exist
        if (!student) {
            student = await Student.create({
                name,
                rollNo,
                courses: [courseId],
            });
        } else {
            // Add the course to the student's courses array if not already present
            if (!student.courses.includes(courseId)) {
                student.courses.push(courseId);
                await student.save();
            }
        }

        // Add the student to the course's students array if not already present
        if (!course.students.includes(student._id)) {
            course.students.push(student._id);
            await course.save(); // Save course after adding student
        }
    }

    // Return the updated course and confirmation message
    return res
        .status(200)
        .json(new ApiResponse(200, "Students added to course successfully", course));
});
