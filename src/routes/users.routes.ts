import { Router } from "express";
import RegisterUserController from '../controller/registerController';
import listAllUsersController from "../controller/listAllUsersController";
import updatedUserController from "../controller/updatedUserController";
import removeUserController from "../controller/removeUserController";
const usersRoutes = Router();
usersRoutes.post("/users",RegisterUserController.handle);
usersRoutes.get("/users",listAllUsersController.handle);
usersRoutes.put("/users/:id",updatedUserController.handle);
usersRoutes.delete("/users/:id",removeUserController.handle );

export {usersRoutes};