// Error handling middleware

function errorHandler(err, req, res, next) {
  console.error(err);
  
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: message,
      timestamp: new Date().toISOString()
    }
  });
}

module.exports = errorHandler;
