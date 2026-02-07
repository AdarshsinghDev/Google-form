import mongoose from "mongoose";

const formSchema = new mongoose.Schema({

    // Step 1 - Basic Information
    email: {
        type: String,
        required: true
    },
    submissionType: {
        type: String,
        required: true,
        enum: ['morning', 'evening']
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

    // Step 2 - Morning Stand-up Items (only for submissionType: 'morning')
    yesterdayWork: {
        type: String,
        required: function () {
            return this.submissionType === 'morning';
        }
    },
    todayDeliverables: {
        type: String,
        required: function () {
            return this.submissionType === 'morning';
        }
    },
    hasBlockers: {
        type: String,
        enum: ['yes', 'no', ''],
        default: '',
        required: function () {
            return this.submissionType === "morning";
        }
    },
    blockerDescription: {
        type: String,
        default: '',
        required: function () {
            return this.hasBlocker === "yes";
        }
    },

    //step 3
    deliveryStatus: {
        type: String,
        enum: ['completed', 'partially', 'blocked', ''],
    },
    completedSummary: {
        type: String,
        default: ''
    },
    incompleteReason: {
        type: String,
        default: ''
    },
    nextAction: {
        type: String,
        default: ''
    },
    additionalNotes: {
        type: String,
        default: ''
    }
}, { timestamps: true });

// Index for faster queries
formSchema.index({ email: 1, date: -1 });
formSchema.index({ submissionType: 1, date: -1 });

export const Form = mongoose.model("Form", formSchema);