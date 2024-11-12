import { Request, Response } from "express";
import { borrowServices } from "./borrow.services";


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

const borrowBooks = async (req: Request, res: Response) => {
    try {
      const result = await borrowServices.createBorrowFromDB(req.body);
      res.status(result.status).json(result);
  
      console.log("this is log", result);
    } catch (error) {
      res.status(500).json({
        success: false,
        status: 500,
        message: "Internal server error",
      });
    }
  };
// borrow overdue book
const borrowOverdueBook = async (req: Request, res: Response) => {
    try {
      const result = await borrowServices.getBorrowOverdueBooks();
  
    
      res.status(200).json({
        success: true,
        status: 200,
        message: result.length > 0 ? "Overdue borrow list fetched." : "No overdue books.",
        data: result,
      });
    } catch (error:any) {
      
      res.status(500).json({
        success: false,
        status: 500,
        message: error.message || "Internal server error",
      });
    }
  };
  
  
    export const borrowControllers={
borrowBooks,
borrowOverdueBook
  }