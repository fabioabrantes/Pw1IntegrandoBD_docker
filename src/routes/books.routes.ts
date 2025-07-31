import { Router } from "express";
import registerBookController from "../controller/registerBookController";
import { verifyToken } from "../middleware/verifyToken";

const booksRoutes = Router();
booksRoutes.post("/books",verifyToken,registerBookController.handle );

export {booksRoutes}