import dotenv from "dotenv";
dotenv.config();
import Express, { Request, Response } from "express";
import cors from "cors"
import { userRouter } from "./routes/user";
import { taskRouter } from "./routes/tasks";
import mongoose from "mongoose";
const app = Express();


app.use(cors<Request>());
app.use(Express.json());

app.use("/user", userRouter);
app.use("/tasks", taskRouter);



async function main() {
    await mongoose.connect(process.env.MONGO_CONN_STRING as string);
    app.listen(3000);

}
main();