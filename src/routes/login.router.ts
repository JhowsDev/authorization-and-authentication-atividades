import { Router } from "express";
import { LoginController } from "../controllers/login.controller";
import { ValidateBody } from "../middlewares";
import { loginBodySchema } from "../schemas";

export const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  "",
  ValidateBody.execute(loginBodySchema),
  loginController.login
);
