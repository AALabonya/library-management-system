import { Router } from "express";
import { ReturnController } from "./return.controller";

const router = Router();


router.post("/", ReturnController.returnBorrowedBook);


export const ReturnRoutes = router;