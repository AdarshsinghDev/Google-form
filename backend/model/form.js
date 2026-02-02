import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    submissionType: {
        type: String,
        required: true
    },
    employee: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    projectTask: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const Form = mongoose.model("Form", formSchema);