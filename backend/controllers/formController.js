import { Form } from "../model/form.js";

export const submitForm = async (req, res) => {

    try {
        // const { email, submissionType, employee, time, date, projectTask } = req.body;
        const { email, submissionType } = req.body;


        const startofDay = new Date();
        startofDay.setHours(0, 0, 0, 0);

        const endofDay = new Date();
        endofDay.setHours(23, 59, 59, 999);

        const alreadySubmitted = await Form.findOne({
            email, submissionType, createdAt: {
                $gte: startofDay,
                $lte: endofDay,
            }
        })
        if (alreadySubmitted) {
            return res.status(404).json({
                message: `You have already submitted ${submissionType} stand-up today`,
                success: false,
            });
        }
        const newForm = await Form.create(req.body);
        console.log(`New Form Created: ${newForm}`);
        return res.status(201).json({ message: "Form submited successfully", success: true })
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