import { Router } from "express";
import { borrowControllers } from "./borrow.controllers";


const router: Router = Router();

router.post('/', borrowControllers.borrowBooks);

export const BorrowRoutes = router