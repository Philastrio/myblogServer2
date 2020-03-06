import { Router } from "express";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/users.handler";

export const router = Router();

router
  .route("/")
  .get(getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);
