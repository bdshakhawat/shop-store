"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequest = void 0;
const zod_1 = require("zod");
const ValidateRequest = (schema) => {
    return (req, res, next) => {
        try {
            // Validate the request body against the schema
            schema.parse(req.body);
            next(); // Proceed to the next middleware/route handler
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                // Send a 400 Bad Request response for validation errors
                res.status(400).json({
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
                return; // Stop execution after sending the response
            }
            // Pass unexpected errors to the next error handler
            next(error);
        }
    };
};
exports.ValidateRequest = ValidateRequest;
