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
exports.MemberControllers = void 0;
const member_services_1 = require("./member.services");
const createMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield member_services_1.MemberServices.createMemberIntoDB(req.body);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
});
const readAllMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield member_services_1.MemberServices.readAllMemberFromDB();
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
});
const readMemberById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield member_services_1.MemberServices.readMemberByIdFromDB(req.params.memberId);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
});
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield member_services_1.MemberServices.updateMemberFromDB(req.params.memberId, req.body);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
});
const deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield member_services_1.MemberServices.deleteMemberFromDB(req.params.memberId);
        res.status(result.status).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal server error"
        });
    }
});
exports.MemberControllers = {
    createMembers,
    readAllMember,
    readMemberById,
    updateMember,
    deleteMember
};
