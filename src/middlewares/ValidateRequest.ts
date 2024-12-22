
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { z, ZodError } from 'zod';

export const ValidateRequest = (schema: z.ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate the request body against the schema
      schema.parse(req.body);
      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      if (error instanceof ZodError) {
        // Format the validation errors in a more user-friendly way
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          error: err.message,
        }));

        // Send a 400 Bad Request response for validation errors
        res.status(400).json({
          message: 'Validation Failed',
          success: false,
          errors: formattedErrors,
        });
        return; // Stop execution after sending the response
      }
      // Pass unexpected errors to the next error handler
      next(error);
    }
  };
};




// ---------------------------------------------------------------------------------------------------------------

// import { Request, Response, NextFunction, RequestHandler } from 'express';
// import { z, ZodSchema, ZodError } from 'zod';

// export const ValidateRequest = (schema: ZodSchema): RequestHandler => {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     try {
//       // Validate the request body against the schema
//       schema.parse(req.body);
//       console.log(req.body);
//       next(); // Proceed to the next middleware/route handler
//     } catch (error) {
//       if (error instanceof ZodError) {
//         // Send a 400 Bad Request response for validation errors
//         res.status(400).json({
//           message: 'Validation Failed',
//           success: false,
//           error: {
//             name: 'ValidationError',
//             details: error.errors.map((err) => ({
//               path: err.path.join('.'),
//               message: err.message,
//             })),
//           },
//         });
//         return; // Stop execution after sending the response
//       }
//       // Pass unexpected errors to the next error handler
//       next(error);
//     }
//   };
// };