import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { HrUserService } from "./hrUser.service";
import httpStatus from "http-status"


const createHrUser = catchAsync(async (req: Request, res: Response) => {
    const result = await HrUserService.createHrUser(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "HR user created successfully",
        data: result
    })
})

const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.params

    const result = await HrUserService.getUserByEmail(email as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "HR user get successfully",
        data: result
    })
})

const getMe = catchAsync(async (req: Request, res: Response) => {

    const { email } = req.user
    const result = await HrUserService.getMe(email as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "profile get successfully",
        data: result
    })
})

const getAllHrUser = catchAsync(async (req: Request, res: Response) => {

    const result = await HrUserService.getAllHrUser()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All HR user get successfully",
        data: result
    })
})

const updateHrUser = catchAsync(async (req: Request, res: Response) => {

    const result = await HrUserService.updateHrUser(req.user.email as string, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "HR user updated successfully",
        data: result
    })
})

const deleteHrUser = catchAsync(async (req: Request, res: Response) => {

    const result = await HrUserService.deleteHrUser(req.params.email as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "HR user deleted successfully",
        data: result
    })
})


export const HrUserController = {
    createHrUser,
    getUserByEmail,
    getMe,
    getAllHrUser,
    updateHrUser,
    deleteHrUser
}