import mongoose, { Schema } from "mongoose";

// College Student Schema
const studentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true 
        },
        rollNo: {
            type: String,
            required: true,
            // unique: true 
        },
        // classes: {
        //     type: Schema.Types.ObjectId,
        //     ref: "Classes", 
        //     // required: true 
        // },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"], // Enum for gender options
            required: true 
        },
        registrationNumber: {
            type: String,
            required: true,
            unique: true
          },
        subjects: [
            {
                type: Schema.Types.ObjectId,
                ref: "Subject" 
            }
        ],
       
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Export the Student model
export const Student = mongoose.model("Student", studentSchema);
