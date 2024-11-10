import { Member } from "@prisma/client";
import { MemberServices } from "./member.services";
import { Request, Response } from "express";

const createMembers= async(req: Request, res: Response)=> {

    try {
        const result = await MemberServices.createMemberIntoDB(req.body as Member);
        res.status(result.status).json(result)

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
};

const readAllMember=async(req: Request, res: Response)=> {

    try {
        const result = await MemberServices.readAllMemberFromDB()
        res.status(result.status).json(result)

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
};

const readMemberById=async(req: Request, res: Response)=> {

    try {
        const result = await MemberServices.readMemberByIdFromDB(req.params.memberId as string)
        res.status(result.status).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
};

const updateMember=async(req: Request, res: Response) =>{

    try {
        const result = await MemberServices.updateMemberFromDB(
            req.params.memberId as string,
            req.body as Partial<Member>
        );

        res.status(result.status).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
};

const deleteMember=async(req: Request, res: Response)=> {

    try {
        const result = await MemberServices.deleteMemberFromDB(req.params.memberId as string)

        res.status(result.status).json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
};

export const MemberControllers = {
    createMembers,
    readAllMember,
    readMemberById,
    updateMember,
    deleteMember
}