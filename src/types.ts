import { z } from "zod";
import { Request } from "express";


export const userType = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be atleast 8 charcters").max(20, "Password must be atmost 20 characters")
})

export const taskType = z.object({
    title: z.string().min(3, "Title must be of at least 3 characters").max(15, "Title must be of at most 15 characters"),
    description: z.string().min(0).max(30, "Title must be of at most 30 characters"),
    completed: z.boolean(),
    authorEmail: z.string().email()

})

export interface CustomRequest extends Request {
    email: string
}






