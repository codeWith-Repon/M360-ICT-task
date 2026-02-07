import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export const validateRequest = (schema: ObjectSchema, source: 'body' | 'query' = 'body') =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            let dataToValidate = source === 'query' ? req.query : req.body;

            if (source === 'body' && dataToValidate.data && typeof dataToValidate.data === 'string') {
                dataToValidate = JSON.parse(dataToValidate.data);
            }

            const validatedData = await schema.validateAsync(dataToValidate, {
                abortEarly: false, //show all errors
                allowUnknown: true, //allow unknown fields
                stripUnknown: true, //remove unknown fields
            });

            if (source === 'query') {
                Object.keys(req.query).forEach(key => delete req.query[key]);
                Object.assign(req.query, validatedData);
            } else {
                req.body = validatedData;
            }

            next();
        } catch (error) {
            next(error);
        }
    };