import { Request, Response } from "express";
import { BookServices } from "./book.services";
import { Book } from "@prisma/client";




const createBooks = async(req: Request, res: Response)=>{
    try {
        const result = await BookServices.createBookFromDB(req.body)
      res.status(result.status).json(result)
    
    } catch (error) {
         res.status(500).json({
            success:false,
            status:500,
            message: "Something went wrong",
         })
    }
}

const readAllBook= async(req: Request, res: Response)=> {

    try {
        const result = await BookServices.readAllBookFromDB();
        res.status(result.status).json(result)

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
};

const readBookById= async(req: Request, res: Response) =>{

    try {
        const result = await BookServices.readBookByIdFromDB(req.params.bookId as string);
        res.status(result.status).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
};
const updateBook=async(req: Request, res: Response)=> {

    try {
        const result = await BookServices.updateBookFromDB(req.params.bookId as string, req.body as Partial<Book>);
        res.status(result.status).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
};

const deleteBook=async(req: Request, res: Response)=> {

    try {
        const result = await BookServices.deleteBookFromDB(req.params.bookId as string);
        res.status(result.status).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
};
export const BookControllers = {
    createBooks,
    readAllBook,
    readBookById,
    updateBook,
    deleteBook
    
}