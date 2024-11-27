import mongoose, { Schema } from "mongoose";

// Test Schema
const testSchema = new Schema(
    {
        testName: {
            type: String,
            required: true, // Test name (e.g., "Midterm Exam")
            trim: true
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course", // Reference to the Course model
            required: true
        },
        marks: [
            {
                student: {
                    type: Schema.Types.ObjectId,
                    ref: "Student", // Reference to the Student model
                    required: true
                },
                score: {
                    type: Number,
                    required: true, // Marks scored by the student
                    min: 0 // Minimum marks is 0
                }
            }
        ]
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Export the Test model
export const Test = mongoose.model("Test", testSchema);
