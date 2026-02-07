import express from 'express';
import { EmployeeRoutes } from '../modules/Employee/employee.routes';
import { HrUserRoutes } from '../modules/HrUser/hrUser.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

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
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router