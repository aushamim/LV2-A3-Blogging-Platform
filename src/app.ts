import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

// Parsers
app.use(express.json());
app.use(cors());

// App routes
// app.use("/api/products", ProductRoutes);
// app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  const content = "<h1>Hello! Welcome to Stationery Shop Server</h1>";
  res.send(content);
});

export default app;
