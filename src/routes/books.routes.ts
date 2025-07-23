import { Router } from "express";
import registerBookController from "../controller/registerBookController";

const booksRoutes = Router();
booksRoutes.post("/users",registerBookController.handle );

export {booksRoutes}