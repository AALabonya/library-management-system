import { Request, Response } from "express";
import { MemberServices } from "./member.services";





const createMembers = async(req: Request, res: Response)=>{
    try {
        const result = await MemberServices.createMemberFromDB(req.body)
      res.status(result.status).json(result)
    
    } catch (error) {
         res.status(500).json({
            success:false,
            status:500,
            message: "Something went wrong",
         })
    }
}

export const MemberControllers = {
    createMembers,
    
}