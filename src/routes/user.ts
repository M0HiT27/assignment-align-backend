import { Router } from "express";
import { UserModel } from "../schemas/user";
import { userType } from "../types";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
export const userRouter = Router();

userRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const parsedData = userType.parse({
            email,
            password
        })
        const user = await UserModel.findOne({
            email: parsedData.email
        })
        if (user && user.password === parsedData.password) {
            const token = jwt.sign({ email: email }, process.env.JWT_STRING as string);
            res.status(200).json({
                message: "Successfully signed in",
                token: token
            })
            return;
        }
        throw "Invalid Credentials"

    } catch (e) {
        if (e instanceof ZodError) {

            const error = e.flatten().fieldErrors;

            let errorMsg = "";
            if (error.email) {
                errorMsg = error.email[0];
            }
            else if (error.password) {
                errorMsg = error.password[0];
            }

            res.status(400).json({
                message: errorMsg
            })
        } else {
            res.status(400).json({
                message: e
            })
        }
    }
})

userRouter.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        const parsedData = userType.parse({
            email,
            password
        })
        const user = await UserModel.create({
            email,
            password,
        })
        if (user) {
            res.status(200).json({
                message: "Successfully signed up"
            })
        }
    } catch (e) {
        if (e instanceof ZodError) {

            const error = e.flatten().fieldErrors;
            let errorMsg = "";
            if (error.email) {
                errorMsg = error.email[0];
            }
            else if (error.password) {
                errorMsg = error.password[0];
            }

            res.status(400).send({
                message: errorMsg
            })
        } else {
            res.status(400).json({
                message: "Error"
            })
        }
    }
})