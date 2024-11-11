import { prisma } from "../../shared/prisma";


// return borrowed book into the database
const returnBorrowedBook = async (borrowId: string) => {
  const isBorrowRecordExist = await prisma.borrow.findUnique({
    where: {
      borrowId,
    },
  });

  if (!isBorrowRecordExist) {
    throw new Error("Borrow record not found");
  }


  await prisma.borrow.update({
    where: {
      borrowId,
    },
    data: {
      returnDate: new Date(),
    },
  });
  return {
    success: true,
    status: 200,
    message: "Book returned successfully.",
  };

};


export const ReturnService = {
  returnBorrowedBook,
};