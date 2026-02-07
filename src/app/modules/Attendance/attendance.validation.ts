import Joi from 'joi';

const createOrUpdateSchema = Joi.object({
    employee_id: Joi.number().integer().positive().required(),
    date: Joi.date().iso().required(), // 'YYYY-MM-DD'
    check_in_time: Joi.string()
        .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
        .required()
        .messages({
            'string.pattern.base': 'check_in_time must be in HH:mm:ss format',
        }),
});

const updateSchema = createOrUpdateSchema.fork(
    ['check_in_time', 'date', 'employee_id'],
    (schema) => schema.optional()
);

const querySchema = Joi.object({
    employee_id: Joi.number().integer().positive().optional(),
    from: Joi.date().iso().optional(),
    to: Joi.date().iso().optional().when('from', {
        is: Joi.exist(),
        then: Joi.date().min(Joi.ref('from')).messages({
            'date.min': 'to date must be after from date',
        }),
    }),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
});

export const AttendanceValidation = {
    createOrUpdateSchema,
    querySchema,
    updateSchema
};