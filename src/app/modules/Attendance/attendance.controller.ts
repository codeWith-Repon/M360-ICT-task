import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { attendanceService } from './attendance.service';
import { IAttendanceQueryFilter } from './attendance.interface';

class AttendanceController {
    public recordAttendance = catchAsync(async (req: Request, res: Response) => {
        const payload = req.body;

        const result = await attendanceService.upsertAttendance(payload);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Attendance recorded/updated successfully',
            data: result,
        });
    });

    public getAllAttendance = catchAsync(async (req: Request, res: Response) => {
        const query = req.query as unknown as IAttendanceQueryFilter;

        const result = await attendanceService.getAllAttendance({
            employee_id: query.employee_id ? Number(query.employee_id) : undefined,
            from: query.from as string | undefined,
            to: query.to as string | undefined,
            page: query.page ? Number(query.page) : undefined,
            limit: query.limit ? Number(query.limit) : undefined,
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Attendance records retrieved successfully',
            data: result,
        });
    });

    public getAttendanceById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        const result = await attendanceService.getAttendanceById(Number(id));

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Attendance record retrieved successfully',
            data: result,
        });
    });

    public updateAttendance = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const payload = req.body

        const result = await attendanceService.updateAttendance(Number(id), payload);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Attendance updated successfully',
            data: result,
        });
    });

    public deleteAttendance = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;

        await attendanceService.deleteAttendance(Number(id));

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Attendance record deleted successfully',
            data: null,
        });
    });
}

export const attendanceController = new AttendanceController();