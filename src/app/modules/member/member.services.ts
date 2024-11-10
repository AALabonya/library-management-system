import { Book, Member } from "@prisma/client";
import { prisma } from "../../shared/prisma";


const createMemberIntoDB=async(payload: Member) =>{

    try {
        const result = await prisma.member.create({
            data: payload
        });

        return {
            success: true,
            status: 201,
            message: 'Member Created Successfully',
            data: result
        }

    } catch (error: any) {
        return {
            success: false,
            status: 400,
            message: error.code === 'P2002' ? 'Email Already Exist' : 'Failed to create new member',
        }
    }
};

const readAllMemberFromDB=async()=> {

    try {
        const result = await prisma.member.findMany();

        return {
            success: true,
            status: 200,
            message: 'Members retrieved successfully',
            data: result
        }

    } catch (error: any) {
        return {
            success: false,
            status: 400,
            message: 'Failed to fetch members'
        }
    }
};

const readMemberByIdFromDB=async(memberId: string) =>{

    try {
        const result = await prisma.member.findUniqueOrThrow({
            where: {
                memberId
            }
        });

        return {
            success: true,
            status: 200,
            message: 'Member retrieved successfully',
            data: result
        }

    } catch (error: any) {
        return {
            success: false,
            status: error.name === 'NotFoundError' ? 404 : 400,
            message: error.name || 'Failed to fetch member'
        }
    }
};

const updateMemberFromDB= async(memberId: string, payload: Partial<Member>) =>{

    try {

        const result = await prisma.member.update({
            where: {
                memberId
            },
            data: payload
        });

        return {
            success: true,
            status: 200,
            message: 'Member updated successfully',
            data: result
        }

    } catch (error: any) {
        return {
            success: false,
            status: error.meta.cause ? 404 : 400,
            message: error.meta.cause || 'Failed to update member',
        }
    }
};

const deleteMemberFromDB=async(memberId: string)=> {

    try {
        await prisma.member.delete({
            where: {
                memberId
            }
        });

        return {
            success: true,
            status: 200,
            message: "Member successfully deleted"
        }

    } catch (error: any) {
        return {
            success: false,
            status: error.meta.cause ? 404 : 400,
            message: error.meta.cause || 'Failed to delete member',
        }
    }

}

export const MemberServices = {
    createMemberIntoDB,
  readAllMemberFromDB,
    readMemberByIdFromDB,
    updateMemberFromDB,
    deleteMemberFromDB
};