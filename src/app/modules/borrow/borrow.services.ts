import { Borrow } from "@prisma/client"
import { prisma } from "../../shared/prisma"


const createBorrowFromDB = async (payload: Borrow) => {
    try {
      const [isBookExist, isMemberExist] = await prisma.$transaction([
        prisma.book.findUnique({
          where: {
            bookId: payload.bookId,
          },
        }),

        prisma.member.findUnique({
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
  
     
      const result = await prisma.$transaction([
       
        prisma.book.update({
          where: { bookId: payload.bookId },
          data: { availableCopies: { decrement: 1 } },
        }),
      
        prisma.borrow.create({
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
        data: result[1]
      };
    } catch (error:any) {
  
      return {
        success: false,
        status: 500,
        message: error.message || "Internal server error",
      };
    }
  };
  
  export const borrowServices = {
    createBorrowFromDB
   
  };
