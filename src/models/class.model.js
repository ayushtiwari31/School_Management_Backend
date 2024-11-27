import mongoose, { Schema } from "mongoose";


const classSchema = new Schema(
    {
        className: {
            type: String,
            required: true,
            trim: true 
        },
        section: {
            type: String,
            required: true,
            trim: true 
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: "Student" 
            }
        ]
    },
    { timestamps: true }
);


export const Class = mongoose.model("Class", classSchema);