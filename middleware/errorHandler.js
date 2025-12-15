module.exports = (error, req, res, next) => {
  console.log(error);

  const statusCode = error.statusCode || 500;
  const status = error.status || 'error'

  res.status(statusCode).json({
    success: false,
    status: status,
    message: error.message || 'Internal Server Error'
  })
};