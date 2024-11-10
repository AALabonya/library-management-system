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


export const BookServices ={
    createBookFromDB
}