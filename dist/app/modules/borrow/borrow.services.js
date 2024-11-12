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
exports.borrowServices = void 0;
const prisma_1 = require("../../shared/prisma");
const createBorrowFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [isBookExist, isMemberExist] = yield prisma_1.prisma.$transaction([
            prisma_1.prisma.book.findUnique({
                where: {
                    bookId: payload.bookId,
                },
            }),
            prisma_1.prisma.member.findUnique({
                where: {
                    memberId: payload.memberId,
                },
            }),
        ]);
        if (!isBookExist || !isMemberExist) {
            throw new Error("Book or Member not found");
        }
        if (isBookExist.availableCopies <= 0) {
            throw new Error("No available copies of this book");
        }
        const [, borrowRecord] = yield prisma_1.prisma.$transaction([
            prisma_1.prisma.book.update({
                where: { bookId: payload.bookId },
                data: { availableCopies: { decrement: 1 } },
            }),
            prisma_1.prisma.borrow.create({
                data: {
                    bookId: payload.bookId,
                    memberId: payload.memberId,
                    borrowDate: new Date(),
                },
                select: {
                    borrowId: true,
                    bookId: true,
                    memberId: true,
                    borrowDate: true,
                },
            }),
        ]);
        return {
            success: true,
            status: 200,
            message: "Book borrowed successfully",
            data: borrowRecord
        };
    }
    catch (error) {
        return {
            success: false,
            status: 500,
            message: error.message || "Internal server error",
        };
    }
});
// const borrowOverdueBook = async () => {
//   const result = await prisma.borrow.findMany({
//     where: {
//       returnDate: {
//         not: null,
//       },
//     },
//     include: {
//       book: {
//         select: {
//           title: true,
//         },
//       },
//       member: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });
//   const finalOverdueBooks = result
//     .filter((book) => {
//       const borrowDate = new Date(book.borrowDate);
//       if (!book.returnDate) {
//         throw new Error("Return date is required");
//       }
//       const returnDate = new Date(book.returnDate);
//       const diffTime = Math.abs(returnDate.getTime() - borrowDate.getTime());
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//       return diffDays > 14;
//     })
//     .map((book) => {
//       const borrowDate = new Date(book.borrowDate);
//       if (!book.returnDate) {
//         throw  new Error( "Return date is required");
//       }
//       const returnDate = new Date(book.returnDate);
//       const diffTime = Math.abs(returnDate.getTime() - borrowDate.getTime());
//       const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 14;
//       return {
//         borrowId: book.borrowId,
//         bookTitle: book.book.title,
//         borrowerName: book.member.name,
//         overdueDays: overdueDays,
//       };
//     });
//   return finalOverdueBooks;
// };
const getBorrowOverdueBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const overdueBorrowBooks = yield prisma_1.prisma.borrow.findMany({
        where: {
            returnDate: null,
            borrowDate: {
                lt: new Date(currentDate.setDate(currentDate.getDate() - 14)),
            },
        },
        include: {
            book: {
                select: {
                    title: true,
                },
            },
            member: {
                select: {
                    name: true,
                },
            },
        },
    });
    const overdueBooks = overdueBorrowBooks.map((record) => {
        const overdueDays = Math.ceil((currentDate.getTime() - new Date(record.borrowDate).getTime()) / (1000 * 3600 * 24));
        return {
            borrowId: record.borrowId,
            bookTitle: record.book.title,
            borrowerName: record.member.name,
            overdueDays: overdueDays,
        };
    });
    return overdueBooks;
});
exports.borrowServices = {
    createBorrowFromDB,
    getBorrowOverdueBooks
};
