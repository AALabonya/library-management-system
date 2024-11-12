"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberServices = void 0;
const prisma_1 = require("../../shared/prisma");
const createMemberIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.member.create({
            data: payload
        });
        return {
            success: true,
            status: 201,
            message: 'Member Created Successfully',
            data: result
        };
    }
    catch (error) {
        return {
            success: false,
            status: 400,
            message: error.code === 'P2002' ? 'Email Already Exist' : 'Failed to create new member',
        };
    }
});
const readAllMemberFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.member.findMany();
        return {
            success: true,
            status: 200,
            message: 'Members retrieved successfully',
            data: result
        };
    }
    catch (error) {
        return {
            success: false,
            status: 400,
            message: 'Failed to fetch members'
        };
    }
});
const readMemberByIdFromDB = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.member.findUniqueOrThrow({
            where: {
                memberId
            }
        });
        return {
            success: true,
            status: 200,
            message: 'Member retrieved successfully',
            data: result
        };
    }
    catch (error) {
        return {
            success: false,
            status: error.name === 'NotFoundError' ? 404 : 400,
            message: error.name || 'Failed to fetch member'
        };
    }
});
const updateMemberFromDB = (memberId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.member.update({
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
        };
    }
    catch (error) {
        return {
            success: false,
            status: error.meta.cause ? 404 : 400,
            message: error.meta.cause || 'Failed to update member',
        };
    }
});
const deleteMemberFromDB = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.member.delete({
            where: {
                memberId
            }
        });
        return {
            success: true,
            status: 200,
            message: "Member successfully deleted"
        };
    }
    catch (error) {
        return {
            success: false,
            status: error.meta.cause ? 404 : 400,
            message: error.meta.cause || 'Failed to delete member',
        };
    }
});
exports.MemberServices = {
    createMemberIntoDB,
    readAllMemberFromDB,
    readMemberByIdFromDB,
    updateMemberFromDB,
    deleteMemberFromDB
};
