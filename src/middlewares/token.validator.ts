import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../configs";
import { AppError } from "../errors";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  // 401 - Unauthorized
  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    throw new AppError("Missing token Bearer prefix", 401);
  }

  const jwtPayload = verifyToken(token);

  res.locals.jwtPayload = jwtPayload;

  return next();
}
