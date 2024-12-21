import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { UserRoutes } from "./app/modules/Users/user.routes";

const app = express();

// Parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:2000"] }));

// Root Route
app.get("/", (req: Request, res: Response) => {
  const content = "<h1>Hello! Welcome to Blogging Platform Server</h1>";
  res.send(content);
});

// App routes
app.use("/api", UserRoutes);

// Global Error Handling
app.use(globalErrorHandler);

// Route Not Found
app.use(notFound);

export default app;
