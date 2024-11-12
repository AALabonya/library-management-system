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
  
     
     const [, borrowRecord] = await prisma.$transaction([
       
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
        data: borrowRecord
      };
    } catch (error:any) {
  
      return {
        success: false,
        status: 500,
        message: error.message || "Internal server error",
      };
    }
  };
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


  const getBorrowOverdueBooks = async () => {
    const currentDate = new Date();
  
    const overdueBorrowBooks = await prisma.borrow.findMany({
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
      const overdueDays = Math.ceil((currentDate.getTime() - new Date(record.borrowDate).getTime()) / (1000 * 3600 * 24), );
  
      return {
        borrowId: record.borrowId,
        bookTitle: record.book.title,
        borrowerName: record.member.name,
        overdueDays: overdueDays,
      };
    });
  
    return overdueBooks;
  };
  export const borrowServices = {
    createBorrowFromDB,
    getBorrowOverdueBooks
   
  };
