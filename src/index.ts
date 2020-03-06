import "dotenv/config";
import "reflect-metadata";
import { server } from "./server";
import { dbConnect } from "./database";

(async () => {
  dbConnect();
  server();
})();
