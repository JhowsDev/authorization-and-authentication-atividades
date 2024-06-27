import { Router } from "express";
import { ValidateBody } from "../middlewares";
import { userCreateSchema } from "../schemas";
import { isAuthenticated } from "../middlewares/token.validator";
import { container } from "tsyringe";
import { UserService } from "../services";
import { UserController } from "../controllers";

export const userRouter = Router();

container.registerSingleton("UserService", UserService)
const userControler = container.resolve(UserController);

userRouter.post("", ValidateBody.execute(userCreateSchema), userControler.create);
userRouter.get("", isAuthenticated, userControler.getMany);
userRouter.delete("/:id", userControler.delete)