"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequest = void 0;
const zod_1 = require("zod");
const ValidateRequest = (schema) => {
    return (req, res, next) => {
        try {
            // Validate the request body against the provided schema
            schema.parse(req.body);
            next(); // Proceed to the next middleware or controller
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                // Handle Zod-specific validation errors
                res.status(400).json({
                    message: 'Validation Failed',
                    success: false,
                    error: {
                        name: 'ValidationError',
                        details: error.errors.map((err) => ({
                            path: err.path.join('.'),
                            message: err.message,
                        })), // Provide detailed validation error messages
                    },
                });
            }
            else {
                // Handle unexpected errors
                next(error);
            }
        }
    };
};
exports.ValidateRequest = ValidateRequest;
// import { Response, Request, NextFunction } from 'express';
// import { z } from 'zod';
// export const ValidateRequest = (schema: z.ZodSchema) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       schema.parse(req.body);
//       next();
//     } catch (error) {
//       const validationError = new Error('Validation Failed');
//       res.status(400).json({
//         message: validationError.message,
//         success: false,
//         error: {
//           name: 'validatiaon error',
//           errors: (error as z.ZodError).errors,
//         },
//         stack: validationError.stack,
//       });
//     }
//   };
// };
