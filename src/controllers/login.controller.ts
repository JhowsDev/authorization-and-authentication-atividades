import { Request, Response } from "express";
import { LoginService } from "../services";

export class LoginController {
  private loginService = new LoginService();

  public login = async (req: Request, res: Response) => {
    const account = await this.loginService.login(req.body);

    return res.json(account);
  };
}