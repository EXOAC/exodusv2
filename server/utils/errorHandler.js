export const handleErrors = (res, error) => {
    console.error('Error:', error);
  
    // Mongoose validation error
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
  
    // Invalid MongoDB ID
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid ID format'
      });
    }
  
    // Duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Duplicate key error'
      });
    }
  
    // Default error
    res.status(500).json({
      message: error.message || 'Internal server error'
    });
  };