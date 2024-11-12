import { Request, Response } from "express";
import { ReturnService } from "./return.services";


const returnBorrowedBook = async (req: Request, res: Response) => {
  try {

    const result = await ReturnService.returnBorrowedBook(req.body);
    
  
    res.status(result.status).json(result);
    
  
    console.log("this is log", result);
  } catch (error: any) {

    console.error("Error occurred while returning borrowed book:", error);


    res.status(500).json({
      success: false,
      status: 500,
      message: error.message || "Internal server error",
    });
  }
};


export const ReturnController = {
  returnBorrowedBook,
};
