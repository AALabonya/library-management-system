import { Request, Response } from "express";
import { BookServices } from "./book.services";




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

export const BookControllers = {
    createBooks,
    
}