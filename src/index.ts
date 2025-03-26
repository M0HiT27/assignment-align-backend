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

app.get("/", (req, res) => {
    console.log("hit");
    res.status(200).json({
        message: "Get endpoint reached "
    })
})

async function main() {
    await mongoose.connect(process.env.MONGO_CONN_STRING as string);
    console.log("DB connected...")
    app.listen(3000);

}
main();