const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render('error', { error: err });
};

module.exports = errorHandler;
