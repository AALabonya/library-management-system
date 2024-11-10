import { Member } from "@prisma/client"
import { prisma } from "../../shared/prisma"

const createMemberFromDB= async(payload:Member)=>{
    try {
        const result = await prisma.member.create({
            data:payload
        })
        return{
            success:true,
            status:201,
            message:'Member Created Successfully',
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


export const MemberServices ={
    createMemberFromDB
}