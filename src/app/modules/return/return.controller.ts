import { Request, Response } from "express";
import { ReturnService } from "./return.services";

// return borrowed book route
const returnBorrowedBook = async (req: Request, res: Response) => {
  try {
    // Call the service to return the borrowed book
    const result = await ReturnService.returnBorrowedBook(req.body.borrowId);
    
    // Send the result as a response
    res.status(result.status).json(result);
    
    // Log the result for debugging
    console.log("this is log", result);
  } catch (error: any) {
    // Handle any errors that occur during the process
    console.error("Error occurred while returning borrowed book:", error);

    // Send error response
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message || "Internal server error",
    });
  }
};

// Export the controller
export const ReturnController = {
  returnBorrowedBook,
};
