import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { IUserService, UserCreateBody } from "../interfaces";
import { userReturnSchema } from "../schemas";
import { hashPassword } from "../utils";

@injectable()
export class UserService implements IUserService {
    public findByEmail = async (email: string) => {
        return await prisma.user.findFirst({where: {email}})
    }

    public findUser = async (userId: number) => {
        const foundUser = await prisma.user.findUnique({where: { id: userId}});

        if(!foundUser) {
            throw new AppError("User not found", 404)
        };

        return foundUser;
    };

    public findMany = async () => {
        const response = await prisma.user.findMany();

        return userReturnSchema.array().parse(response);
    };

    public create = async (body: UserCreateBody) => {

        const hasDuplicatedEmail = await this.findByEmail(body.email);

        if(hasDuplicatedEmail) {
            throw new AppError("Email already used", 409)
        }

        body.password = await hashPassword(body.password);
        
        const account = await prisma.user.create({
          data: body,
        });

        return userReturnSchema.parse(account);
    };

    public delete = async (userId: number) => {
        await this.findUser(userId);
        await prisma.user.delete({where: {id: userId}});    
    };
};