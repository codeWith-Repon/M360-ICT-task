import express from 'express';
import { employeeController } from './employee.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validateRequest';
import { EmployeeValidation } from './employee.validation';
import { fileUploader } from '../../utils/fileUploader';

const router = express.Router();

router.post(
    '/',
    checkAuth(),
    fileUploader.upload.single('file'),
    validateRequest(EmployeeValidation.createEmployeeSchema),
    employeeController.createEmployee
);

router.get('/', checkAuth(), employeeController.getAllEmployees);
router.get('/:id', checkAuth(), employeeController.getEmployeeById);
router.patch(
    '/:id',
    checkAuth(),
    fileUploader.upload.single('file'),
    validateRequest(EmployeeValidation.updateEmployeeSchema),
    employeeController.updateEmployee
);
router.delete('/:id', checkAuth(), employeeController.deleteEmployee);

export const EmployeeRoutes = router;