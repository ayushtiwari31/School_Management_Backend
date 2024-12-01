import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema(
    {
        subjectName: {
            type: String,
            required: true,
            trim: true
        },
        subjectCode: {
            type: String,
            trim: true
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "Teacher", 
            default:null
        },
        class: {
            type: Schema.Types.ObjectId,
            ref: "Class", 
            default:null,
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "Student" 
            }
        ],
        tests: [
            {
                type: Schema.Types.ObjectId,
                ref: "Test"
            }
        ]
    },
    { timestamps: true } 
);


export const Subject = mongoose.model("Subject", subjectSchema);
