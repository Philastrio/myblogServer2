import * as express from "express";
import { Request, Response } from "express";
import { notFoundError, errorHandler } from "./middlewares/errors.middlewares";
import * as cors from "cors";
import * as morgan from "morgan";
import { router as UserRoutes } from "./controllers/users.routes";
import * as bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//3개의 위치는 정말 중요하다
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// routes
app.get("/", (req: Request, res: Response) => {
  res.json({ hello: "world" });
});
app.use("/users", UserRoutes);

//middlewares

app.use(notFoundError);
app.use(errorHandler);

export const server = async () => {
  const port = process.env.PORT;
  await app.listen(port);
  console.log(`Server started at http://localhost:${port}`);
};
