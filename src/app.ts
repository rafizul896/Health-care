import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user.routes";
import { AdminRoutes } from "./app/modules/Admin/admin.routes";

const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/admin", AdminRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Health care server is running...!",
  });
});

export default app;
