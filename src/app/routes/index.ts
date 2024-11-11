import { Router } from "express";
import { BookRoute } from "../modules/book/book.routes";
import { MemberRoutes } from "../modules/member/member.routes";
import { BorrowRoutes } from "../modules/borrow/borrow.routes";
const router = Router();

const moduleRoutes = [
    {
        path: '/books',
        route: BookRoute
    },
    {
        path: '/members',
        route: MemberRoutes
    },
    {
        path: '/borrow',
        route:BorrowRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;