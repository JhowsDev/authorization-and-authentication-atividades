import { z } from "zod";
import { userReturnSchema, userSchema } from "../schemas";

export type User = z.infer<typeof userSchema>;

export type UserCreateBody = Omit<User, "id">;

export type userReturn = z.infer<typeof userReturnSchema>

export interface IUserService {
    findByEmail(email: string): Promise<User | null>,
    findUser(userId: number): Promise<userReturn>,
    findMany(): Promise<userReturn[]>,
    create(body: UserCreateBody): Promise<userReturn>,
    delete(userId: number): void
}