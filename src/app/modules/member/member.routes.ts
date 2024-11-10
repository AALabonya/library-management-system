import { Router } from "express";
import { MemberControllers } from "./member.controllers";


const router: Router = Router();

router.post('/', MemberControllers.createMembers);
router.get('/', MemberControllers.readAllMember);
router.get('/:memberId', MemberControllers.readMemberById);
router.put('/:memberId', MemberControllers.updateMember);
router.delete('/:memberId', MemberControllers.deleteMember);
export const MemberRoutes = router;