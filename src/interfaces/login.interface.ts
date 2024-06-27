import { z } from "zod";
import { loginBodySchema } from "../schemas";

export type loginBody = z.infer<typeof loginBodySchema>;