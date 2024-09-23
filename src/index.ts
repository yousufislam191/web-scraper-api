import { app } from "./app";

const PORT: number = 3000;

app.listen(PORT, (): void => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
