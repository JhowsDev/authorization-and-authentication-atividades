import { app } from "./app";
import { parsedEnv } from "./configs";

parsedEnv?.JWT_SECRET;

const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));