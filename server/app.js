import { config } from "dotenv";
config({ path: "./.env" });
import "express-async-errors";
const port = process.env.PORT || 3001;
import express, { json } from "express";
import cors from "cors";
import notFoundError from "./middleware/notFoundError.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./database/connect.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routers/authRouter.js";
import blogRouter from "./routers/blogRouter.js";
import userRouter from "./routers/userRouter.js";
const app = express();

app.use(json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use(notFoundError);
app.use(errorHandler);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Server is listening on ${port}`));
	} catch (error) {
		console.log(error);
	}
};

start();
