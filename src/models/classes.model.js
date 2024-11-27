import mongoose, { Schema } from "mongoose";

// Department Schema
const classesSchema = new Schema(
    {
        classes: {
            type: Schema.Types.ObjectId,
            ref: "Branch", 
            default: null 
        }
    },
    { timestamps: true } 
);

// Export the Department model
export const Classes = mongoose.model("Classes", classesSchema);
