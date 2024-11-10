import { Book } from "@prisma/client"
import { prisma } from "../../shared/prisma"


const createBookFromDB= async(payload:Book)=>{
    try {
        const result = await prisma.book.create({
            data:payload
        })
        return{
            success:true,
            status:201,
            message:'Book Created Successfully',
            data:result
        }
    } catch (error) {
        return{
            success:false,
            status:400,
            message: "Something went wrong",
            data:error
        } 
    }
}

const readAllBookFromDB = async() =>{

    try {
        const result = await prisma.book.findMany();

        return {
            success: true,
            status: 200,
            message: 'Books retrieved successfully',
            data: result
        }

    } catch (error: any) {
        return {
            success: false,
            status: 400,
            message: 'Failed to fetch books'
        }
    }
};

const readBookByIdFromDB= async(bookId: string)=> {

    try {
        const result = await prisma.book.findUniqueOrThrow({
            where: {
                bookId
            }
        });

        return {
            success: true,
            status: 200,
            message: 'Book retrieved successfully',
            data: result
        }

    } catch (error: any) {
        return {
            success: false,
            status: error.name || 'Not Found Error',
            message: error.name || 'Failed to fetch book'
        }
    }
};
const updateBookFromDB= async(bookId: string, payload: Partial<Book>) =>{

    try {

        const result = await prisma.book.update({
            where: {
                bookId
            },
            data: payload
        });

        return {
            success: true,
            status: 200,
            message: 'Book updated successfully',
            data: result
        }

    } catch (error: any) {
        return {
            success: false,
            status: error.meta.cause ? 404 : 400,
            message: error.meta.cause || 'Failed to update book',
        }
    }
};
const deleteBookFromDB=async(bookId: string)=> {

    try {
        await prisma.book.delete({
            where: {
                bookId
            }
        });

        return {
            success: true,
            status: 200,
            message: "Book successfully deleted"
        }

    } catch (error: any) {
        return {
            success: false,
            status: error.meta.cause ? 404 : 400,
            message: error.meta.cause || 'Failed to delete book',
        }
    }

}
export const BookServices ={
    createBookFromDB,
    readAllBookFromDB ,
    readBookByIdFromDB,
    updateBookFromDB,
    deleteBookFromDB
}