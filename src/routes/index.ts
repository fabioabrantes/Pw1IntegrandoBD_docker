import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { booksRoutes } from "./books.routes";

const routes = Router();
routes.use(booksRoutes);
routes.use(usersRoutes);


export {routes};
