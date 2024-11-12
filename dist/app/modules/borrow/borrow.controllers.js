"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowControllers = void 0;
const borrow_services_1 = require("./borrow.services");
// const borrowBooks = async(req: Request, res: Response)=> {
//     try {
//         // console.log("this is log", req.body);
//         const result = await borrowServices.createBorrowFromDB(req.body);
//         res.status(result.status).json(result)
// console.log("this is log", result);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             status: 500,
//             message: "Internal server error"
//         });
//     }
//   }
//   export const borrowControllers={
// borrowBooks
//   }
const borrowBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_services_1.borrowServices.createBorrowFromDB(req.body);
        res.status(result.status).json(result);
        console.log("this is log", result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error",
        });
    }
});
// borrow overdue book
const borrowOverdueBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_services_1.borrowServices.getBorrowOverdueBooks();
        res.status(200).json({
            success: true,
            status: 200,
            message: result.length > 0 ? "Overdue borrow list fetched." : "No overdue books.",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: error.message || "Internal server error",
        });
    }
});
exports.borrowControllers = {
    borrowBooks,
    borrowOverdueBook
};
