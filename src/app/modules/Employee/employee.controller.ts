import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { employeeService } from "./employee.service";
import { fileUploader } from "../../utils/fileUploader";

class EmployeeController {
    public createEmployee = catchAsync(async (req: Request, res: Response) => {

        if (req.file) {
            const cloudinaryResponse = await fileUploader.uploadToCloudinary(req.file);

            if (cloudinaryResponse) {
                req.body.photo_path = cloudinaryResponse.secure_url
            }
        }

        const result = await employeeService.createEmployee(req.body);

        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "Employee created successfully",
            data: result
        });
    });

    public getEmployeeById = catchAsync(async (req: Request, res: Response) => {
        const result = await employeeService.getEmployeeById(req.params.id as string);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Employee fetched successfully",
            data: result
        });
    });

    public getAllEmployees = catchAsync(async (req: Request, res: Response) => {
        const result = await employeeService.getAllEmployees(req.query);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Employees fetched successfully",
            data: result
        });
    });

    public updateEmployee = catchAsync(async (req: Request, res: Response) => {
        if (req.file) {
            const cloudinaryResponse = await fileUploader.uploadToCloudinary(req.file);

            if (cloudinaryResponse) {
                req.body.photo_path = cloudinaryResponse.secure_url
            }
        }
        const result = await employeeService.updateEmployee(req.params.id as string, req.body);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Employee updated successfully",
            data: result
        });
    });

    public deleteEmployee = catchAsync(async (req: Request, res: Response) => {
        const result = await employeeService.deleteEmployee(req.params.id as string);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Employee deleted successfully",
            data: result
        });
    });
}

export const employeeController = new EmployeeController();