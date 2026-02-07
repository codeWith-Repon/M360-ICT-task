import { Router } from 'express';
import { attendanceController } from './attendance.controller';
import { AttendanceValidation } from './attendance.validation';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validateRequest';

const router = Router();

router.post(
    '/',
    validateRequest(AttendanceValidation.createOrUpdateSchema),
    attendanceController.recordAttendance
);

router.get(
    '/',
    checkAuth(),
    validateRequest(AttendanceValidation.querySchema, 'query'),
    attendanceController.getAllAttendance
);

router.get(
    '/:id',
    checkAuth(),
    attendanceController.getAttendanceById
);

router.patch(
    '/:id',
    validateRequest(AttendanceValidation.updateSchema),
    attendanceController.updateAttendance
);

router.delete(
    '/:id',
    checkAuth(),
    attendanceController.deleteAttendance
);

export const AttendanceRoutes = router;