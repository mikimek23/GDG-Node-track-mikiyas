
export const errorHandler=(err, req, res, next) => {
 // console.error(err.stack); // Log error details (optional)

  res.status(err.statusCode || 500).json({
    status: err.status,
    message: err.message || "Internal Server Error",
  });
  
};