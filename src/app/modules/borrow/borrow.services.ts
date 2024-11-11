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
  const borrowOverdueBook = async () => {
   
    const result = await prisma.borrow.findMany({
      where: {
        returnDate: {
          not: null,
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
  
   
    const finalOverdueBooks = result
      .filter((book) => {
        const borrowDate = new Date(book.borrowDate);
        if (!book.returnDate) {
          throw new Error("Return date is required");
        }
        const returnDate = new Date(book.returnDate);
        const diffTime = Math.abs(returnDate.getTime() - borrowDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 14;
      })
      .map((book) => {
        const borrowDate = new Date(book.borrowDate);
        if (!book.returnDate) {
          throw  new Error( "Return date is required");
        }
        const returnDate = new Date(book.returnDate);
        const diffTime = Math.abs(returnDate.getTime() - borrowDate.getTime());
        const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 14;
        return {
          borrowId: book.borrowId,
          bookTitle: book.book.title,
          borrowerName: book.member.name,
          overdueDays: overdueDays,
        };
      });
  
    return finalOverdueBooks;
  };
  export const borrowServices = {
    createBorrowFromDB,
    borrowOverdueBook
   
  };
