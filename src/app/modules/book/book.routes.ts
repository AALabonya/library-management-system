import { Router } from "express";
import { BookControllers } from "./book.controller";



const router: Router = Router();

router.post('/', BookControllers.createBooks);
router.get('/', BookControllers.readAllBook);
router.get('/:bookId', BookControllers.readBookById);
router.put('/:bookId', BookControllers.updateBook);
router.delete('/:bookId', BookControllers.deleteBook);

export const BookRoute = router;