import { generateToken } from "../configs";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { loginBody } from "../interfaces/login.interface";
import * as bcrypt from "bcryptjs"

export class LoginService {
    public login = async (body: loginBody) => {
        const user = await prisma.user.findUnique({
          where: { email: body.email },
        });
    
        // 401 - UNAUTHORIZED
        if (!user) {
          throw new AppError("Invalid credentials", 401);
        }
    
        const passwordMatch = await bcrypt.compare(
          body.password,
          user.password
        );
    
        if (!passwordMatch) {
            throw new AppError("Invalid credentials", 401);
        }
    
        const token = generateToken(
          { name: user.name },
          user.id
        );
    
        return { token };
      };
};