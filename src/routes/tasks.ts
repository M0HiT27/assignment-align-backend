import { Router, Response, Request } from "express";

import { CustomRequest, taskType, userType } from "../types";
import { TaskModel } from "../schemas/user";
import { ZodError } from "zod";
import { auth } from "../middlewares/auth";

export const taskRouter = Router();
taskRouter.use(auth);


taskRouter.get("/", async (req: Request, res: Response) => {
    try {

        const parsedEmail = req.body.email;

        const tasks = await TaskModel.find({
            authorEmail: parsedEmail
        })
        if (tasks) {
            console.log("sending tasks...");
            res.status(200).json({
                tasks: tasks
            })
            console.log("tasks sent");
            return;
        }
        throw ""

    } catch (e) {
        res.status(400).json({
            message: "Inavalid Credentials"
        })
    }
})


taskRouter.post("/", async (req, res) => {
    try {
        const { task } = req.body;

        const parsedEmail = req.body.email;
        const parsedTask = taskType.omit({ authorEmail: true }).parse(task);

        const createdTask = await TaskModel.create({
            title: parsedTask.title,
            description: parsedTask.description,
            completed: parsedTask.completed,
            authorEmail: parsedEmail
        })

        if (createdTask) {
            res.status(200).json({
                message: "Task Created"
            })
        }

    } catch (e) {
        if (e instanceof ZodError) {

        }
    }
})


taskRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const parsedEmail = req.body.email;

        const deletion = await TaskModel.findOneAndDelete({
            _id: id,
            authorEmail: parsedEmail
        })
        if (deletion) {
            res.status(200).json({
                message: "Task Deleted"
            })
            return;
        }

        throw "Error"

    } catch (e) {
        res.status(400).json({
            message: "Invalid Credentials"
        })
    }
})


taskRouter.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { updates } = req.body;

        const parsedEmail = req.body.email;

        const parsedUpdates = taskType.omit({ authorEmail: true }).partial().parse(updates);
        console.log(parsedUpdates);
        const updatedTask = await TaskModel.findOneAndUpdate({
            authorEmail: parsedEmail,
            _id: id
        }, parsedUpdates)

        if (updatedTask) {
            res.status(200).json({
                message: "Task Updated"
            })
            return;
        }
        throw "Error"

    } catch (e) {
        res.status(400).json({
            message: "Invalid Credentials"
        })
    }
})

