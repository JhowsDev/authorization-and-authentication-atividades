import express, { json } from "express";
import helmet from "helmet";
import "reflect-metadata";
import "express-async-errors";
import { HandleErrors } from "./middlewares";
import { loginRouter, userRouter } from "./routes";

export const app = express();

app.use(helmet());

app.use(json());

app.use("/user", userRouter);
app.use("/login", loginRouter);

app.use(HandleErrors.execute);