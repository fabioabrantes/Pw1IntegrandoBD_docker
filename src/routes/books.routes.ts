import { Router } from "express";
import registerBookController from "../controller/registerBookController";

const booksRoutes = Router();
booksRoutes.post("/books",registerBookController.handle );

export {booksRoutes}