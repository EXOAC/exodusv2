export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
  
    // MongoDB Specific Errors
    if (err.name === 'MongoServerError') {
      if (err.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Duplicate key error - this record already exists'
        });
      }
    }
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
  
    // Default error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  };