import mongoose from "mongoose";
import { Schema, Types } from "mongoose";

const User = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});
export const UserModel = mongoose.model("Users", User);



const Task = new Schema({
    title: String,
    description: String,
    completed: Boolean,
    authorEmail: String
})
export const TaskModel = mongoose.model("Tasks", Task);