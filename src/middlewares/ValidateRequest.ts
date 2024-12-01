import { Response, Request, NextFunction } from 'express';
import { z } from 'zod';

export const ValidateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse the entire request body
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation Failed',
          success: false,
          error: {
            name: 'ValidationError',
            details: error.errors.map((err) => ({
              path: err.path.join('.'),
              message: err.message,
            })),
          },
        });
      }
      
      // Handle unexpected errors
      next(error);
    }
  };
};