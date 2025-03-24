import { NextFunction, Response, Request } from "express";
import { userType } from "../types";
import jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw "Invalid credentials"
        }
        const decoded = jwt.verify(token, process.env.JWT_STRING as string);

        req.body.email = userType.pick({ email: true }).parse(decoded).email;
        next();
    } catch (e) {
        res.status(401).json({
            message: "Please authenticate"
        })
    }
}