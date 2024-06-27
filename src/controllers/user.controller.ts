import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IUserService } from "../interfaces";

@injectable()
export class UserController {
    constructor(
        @inject("UserService") private userService: IUserService
    ) {}

    public getMany = async (req: Request, res: Response) => {
        const users = await this.userService.findMany();

        return res.json(users);
    };

    public create = async (req: Request, res: Response) => {
        const newUser = await this.userService.create(req.body);

        return res.status(201).json(newUser);
    };

    public delete = async (req: Request, res: Response) => {
        await this.userService.delete(Number(req.params.id));

        return res.status(204).json();
    };
};