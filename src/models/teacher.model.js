import mongoose, { Schema } from "mongoose";


const teacherSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true 
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true, 
            trim: true
        },
        subjects: [
            {
                type: Schema.Types.ObjectId,
                ref: "subject" 
            }
        ]
    },
    { timestamps: true } 
);


export const Teacher = mongoose.model("Teacher", teacherSchema);
