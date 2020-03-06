import { Request, Response, NextFunction } from "express";
import { getRepository, Repository } from "typeorm";
import { Users } from "../entities/Users";
import * as bcrypt from "bcrypt";

//users
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const users: Users[] = await getRepository(Users).find();
    return res.json(users);
  } catch (e) {
    next(e);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const exUser = await getRepository(Users).findOne({
      where: {
        email: req.body.email
      }
    });
    if (exUser) {
      return res.status(400).json("이미 사용중인 아이디입니다");
    }
    const hashedPassword: Users["password"] = await bcrypt.hash(
      req.body.password,
      12
    );
    const newUser: Users = await getRepository(Users).create({
      name: req.body.name,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
      password: hashedPassword
    });
    await getRepository(Users).save(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.log(e);

    //에러처리는 여기서
    next(e);
  }
};

//user
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = await getRepository(Users).findOne(id);
    return res.json(user);
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = await getRepository(Users).findOne(id);
    if (user) {
      await getRepository(Users).merge(user, req.body);
      await getRepository(Users).save(user);
      return res.json(user);
    }
    return res.status(404).json({ message: "Not User Found" });
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;
    await getRepository(Users).delete(id);
    return res.json({ message: "Delete Success" });
  } catch (e) {
    next(e);
  }
};
