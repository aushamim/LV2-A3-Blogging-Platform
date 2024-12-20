import express, { Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/Users/user.routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

// Parsers
app.use(express.json());
app.use(cors());

// App routes
app.use("/api", UserRoutes);

// Global Error Handling
app.use(globalErrorHandler);

// Route Not Found
app.use(notFound);

app.get("/", (req: Request, res: Response) => {
  const content = "<h1>Hello! Welcome to Stationery Shop Server</h1>";
  res.send(content);
});

export default app;
