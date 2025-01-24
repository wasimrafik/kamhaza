const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        // Default to 500 if the error does not have a code
        const statusCode = error.statusCode || 500;

        // If the error is not expected, pass it to the default error handler
        if (!error.message) {
            return next(error);
        }

        // Handle expected errors with a response
        res.status(statusCode).json({
            success: false, // Corrected spelling
            message: error.message || "An unexpected error occurred",
        });
    }
}
  
  export default asyncHandler;
  