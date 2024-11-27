

const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await Promise.resolve(requestHandler(req, res, next));
        } catch (error) {
            const statusCode = error.statusCode || 500;
            const errorMessage = error.message || "Internal Server Error";
            // res.status(statusCode).json({
            //     success: false,
            //     error: errorMessage
            // });
            // next({
            //     status: statusCode,
            //     message: errorMessage
            // });
            next(error)
        }
    };
};

export {asyncHandler};