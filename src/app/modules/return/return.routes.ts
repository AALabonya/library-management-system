import { Router } from "express";
import { ReturnController } from "./return.controller";

const router = Router();

// return borrowed book route
router.post("/", ReturnController.returnBorrowedBook);

// export the router
export const ReturnRoutes = router;