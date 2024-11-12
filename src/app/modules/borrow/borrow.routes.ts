import { Router } from "express";
import { borrowControllers } from "./borrow.controllers";


const router: Router = Router();

router.post('/', borrowControllers.borrowBooks);
router.get('/overdue', borrowControllers.borrowOverdueBook);
export const BorrowRoutes = router