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
exports.BookServices = void 0;
const prisma_1 = require("../../shared/prisma");
const createBookFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.book.create({
            data: payload
        });
        return {
            success: true,
            status: 201,
            message: 'Book Created Successfully',
            data: result
        };
    }
    catch (error) {
        return {
            success: false,
            status: 400,
            message: "Something went wrong",
            data: error
        };
    }
});
const readAllBookFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.book.findMany();
        return {
            success: true,
            status: 200,
            message: 'Books retrieved successfully',
            data: result
        };
    }
    catch (error) {
        return {
            success: false,
            status: 400,
            message: 'Failed to fetch books'
        };
    }
});
const readBookByIdFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.book.findUniqueOrThrow({
            where: {
                bookId
            }
        });
        return {
            success: true,
            status: 200,
            message: 'Book retrieved successfully',
            data: result
        };
    }
    catch (error) {
        return {
            success: false,
            status: error.name || 'Not Found Error',
            message: error.name || 'Failed to fetch book'
        };
    }
});
const updateBookFromDB = (bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.book.update({
            where: {
                bookId
            },
            data: payload
        });
        return {
            success: true,
            status: 200,
            message: 'Book updated successfully',
            data: result
        };
    }
    catch (error) {
        return {
            success: false,
            status: error.meta.cause ? 404 : 400,
            message: error.meta.cause || 'Failed to update book',
        };
    }
});
const deleteBookFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.book.delete({
            where: {
                bookId
            }
        });
        return {
            success: true,
            status: 200,
            message: "Book successfully deleted"
        };
    }
    catch (error) {
        return {
            success: false,
            status: error.meta.cause ? 404 : 400,
            message: error.meta.cause || 'Failed to delete book',
        };
    }
});
exports.BookServices = {
    createBookFromDB,
    readAllBookFromDB,
    readBookByIdFromDB,
    updateBookFromDB,
    deleteBookFromDB
};
