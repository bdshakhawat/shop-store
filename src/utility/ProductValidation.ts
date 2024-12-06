import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';


export const productValidation = z.object({
  name: z.string({
    errorMap: () => ({
      message: 'Name is required',
    }),
  }).min(1, 'Name is required').max(100, 'Name is too long'),
  // name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  // brand: z.string().min(1, 'Brand is required').max(50, 'Brand is too long'),
  brand: z.string({
    errorMap: () => ({
      message: 'Brand is required',
    }),
  }).min(1, 'Name is required').max(100, 'Name is too long'),
  price: z.number().positive('Price must be greater than zero'),
  category: z.enum(
    ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
    {
      errorMap: () => ({
        message: 'The category must be one of the following values: Writing, Office Supplies, Art Supplies, Educational, Technology',
      }),
    },
  ),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(300, 'Description is too long'),
  quantity: z.number().int().positive('Quantity must be a positive number'),
  inStock: z.boolean(),
});

export const productUpdateValidation = productValidation.partial();

// Modify the error format globally if required, use this in the request handler where the errors are caught:
const myRouteHandler= (req: Request, res: Response, next: NextFunction) => {
  try {
    productValidation.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join('.'),
        error: err.message,
      }));
      res.status(400).json({
        message: 'Validation Failed',
        success: false,
        errors: formattedErrors,
      });
      return;
    }
    next(error);
  }
};






// ---------------------------------------------------------------------------------------------------------------

// import { z } from 'zod';


// export const productValidation = z.object({
//   name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
//   brand: z.string().min(1, 'Brand is required').max(50, 'Brand is too long'),
//   price: z.number().positive('Price must be greater than zero'),
//   category: z.enum(
//     ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
//     {
//       errorMap: () => ({
//         message:
//           'The category must be one of the following: Writing, Office Supplies, Art Supplies, Educational, Technology',
//       }),
//     },
//   ),
//   description: z
//     .string()
//     .min(1, 'Description is required')
//     .max(300, 'Description is too long'),
//   quantity: z.number().int().positive('Quantity must be a positive number'),
//   inStock: z.boolean(),
// });

// export const productUpdateValidation = productValidation.partial();





// -----------------------------------------------------------------------------------------------------------

// export const productValidation = z.object({
//   name: z.string().min(1, 'Name is required').max(100, 'Name is Too long'),
//   brand: z.string().min(1, 'Brand is required').max(50, 'Brand is too long'),
//   price: z.number().positive('Price must be greater than Zero'),
//   category: z.enum(
//     ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
//     {
//       errorMap: () => ({
//         message:
//           'category must be one of the following Writing,Office Supplies,Art Supplies,Educational,Technology',
//       }),
//     },
//   ),
//   description: z.string()
//     .min(1, 'Description is required')
//     .max(300, 'Description is too long'),
//   quantity: z.number().int().positive('Quantity must be a positive number'),
//   inStock: z.boolean(),
// });
