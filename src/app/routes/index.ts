import express from 'express';
import { EmployeeRoutes } from '../modules/Employee/employee.routes';
import { HrUserRoutes } from '../modules/HrUser/hrUser.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { AttendanceRoutes } from '../modules/Attendance/attendance.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        router: AuthRoutes
    },
    {
        path: "/hr",
        router: HrUserRoutes
    },
    {
        path: "/employees",
        router: EmployeeRoutes
    },
    {
        path: "/attendance",
        router: AttendanceRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router