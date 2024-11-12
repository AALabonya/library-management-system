"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowRoutes = void 0;
const express_1 = require("express");
const borrow_controllers_1 = require("./borrow.controllers");
const router = (0, express_1.Router)();
router.post('/', borrow_controllers_1.borrowControllers.borrowBooks);
router.get('/overdue', borrow_controllers_1.borrowControllers.borrowOverdueBook);
exports.BorrowRoutes = router;
