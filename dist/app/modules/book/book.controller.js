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
exports.BookControllers = void 0;
const book_services_1 = require("./book.services");
const createBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_services_1.BookServices.createBookFromDB(req.body);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong",
        });
    }
});
const readAllBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_services_1.BookServices.readAllBookFromDB();
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
});
const readBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_services_1.BookServices.readBookByIdFromDB(req.params.bookId);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_services_1.BookServices.updateBookFromDB(req.params.bookId, req.body);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_services_1.BookServices.deleteBookFromDB(req.params.bookId);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
});
exports.BookControllers = {
    createBooks,
    readAllBook,
    readBookById,
    updateBook,
    deleteBook
};
