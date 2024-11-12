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
exports.ReturnService = void 0;
const prisma_1 = require("../../shared/prisma");
// return borrowed book into the database
const returnBorrowedBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBorrowRecordExist = yield prisma_1.prisma.borrow.findUnique({
        where: {
            borrowId: payload.borrowId,
        },
    });
    if (!isBorrowRecordExist) {
        throw new Error("Borrow record not found");
    }
    yield prisma_1.prisma.borrow.update({
        where: {
            borrowId: payload.borrowId,
        },
        data: {
            returnDate: new Date(),
        },
    });
    return {
        success: true,
        status: 200,
        message: "Book returned successfully.",
    };
});
exports.ReturnService = {
    returnBorrowedBook,
};
