import { Form } from "../model/form.morning.js";

export const submitForm = async (req, res) => {

    try {
        const { email, submissionType, employee, time, date, projectTask, yesterdayWork, todayDeliverables, hasBlockers, blockerDescription, deliveryStatus, completedSummary, incompleteReason, nextAction, additionalNotes } = req.body;

        if (!email?.trim() || !submissionType?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing"
            });
        }
        const now = new Date();

        const startofDay = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            0, 0, 0
        ));

        const endofDay = new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            23, 59, 59, 999
        ));

        const alreadySubmitted = await Form.findOne({
            email, submissionType, createdAt: {
                $gte: startofDay,
                $lte: endofDay,
            }
        })
        if (alreadySubmitted) {
            return res.status(409).json({
                message: `You have already submitted ${submissionType} stand-up today`,
                success: false,
            });
        }

        
        const newForm = await Form.create({
            email,
            submissionType,
            employee,
            time,
            date,
            projectTask, yesterdayWork, todayDeliverables, hasBlockers, blockerDescription, deliveryStatus, completedSummary, incompleteReason, nextAction, additionalNotes
        });
        console.log(`New Form Created: ${newForm}`);
        return res.status(201).json({ message: "Submitted successfully", success: true })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Form submission failed",
            error: error.message
        });
    }
}

export const getAllForm = async (req, res) => {
    try {
        const forms = await Form.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: forms.length,
            data: forms
        });
    } catch (error) {
        console.log("Error while getting data", error);
        return res.status(500).json({
            success: false,
            message: "Failed to load data"
        })
    }
}