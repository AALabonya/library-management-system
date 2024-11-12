import { prisma } from "../../shared/prisma";


// return borrowed book into the database
const returnBorrowedBook = async (payload:{borrowId: string}) => {
  const isBorrowRecordExist = await prisma.borrow.findUnique({
    where: {
      borrowId:payload.borrowId,
    },
  });

  if (!isBorrowRecordExist) {
    throw new Error("Borrow record not found");
  }


  await prisma.borrow.update({
    where: {
      borrowId:payload.borrowId,
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