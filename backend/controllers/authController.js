import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { email, fullname, password, role, team, skills, experience } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }
        const hashedPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            email, fullname, password: hashedPass, role, team, skills, experience
        }
        );
        console.log("user: ", user);
        return res.json({ message: "Account Created Succesfully", user });
    } catch (err) {
        res.status(500).json(err.message);
    }
};


export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const userName = user.fullname;

        if (!user)
            return res.status(400).json("User not found");

        const match = bcrypt.compare(password, user.password);

        if (!match)
            return res.status(400).json("Wrong password");

        const token = jwt.sign(
            { id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }
        );
        console.log("user: ", user, "token: ", token);
        return res.json({ message: "Login successfully", token, userName });
    } catch (error) {
        res.status(500).json(error.message);
    }
};
