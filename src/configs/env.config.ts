import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

function validateEnvVars() {
  const parseResult = envSchema.safeParse(process.env);
  
  if (!parseResult.success) {
    parseResult.error.errors.forEach(({ path, message }) => {
      console.log(`Enviroment variable ${path}: ${message}`);
    });

    process.exit(1);
  }

  return parseResult.data;
}

export const parsedEnv = validateEnvVars();
