import ApiError from "../Utils/ApiError.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new ApiError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const errorObject = err.keyValue;
  const message = Object.keys(errorObject)
    .map((key) => `${key}: ${errorObject[key]}`)
    .join(". ");
  // const message = err.keyValue.name;
  return new ApiError(
    `Duplicate field value: '${message}'. Please use another value`,
    400
  );
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data, ${errors.join(". ")}`;

  return new ApiError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
    message: err.message,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational == true) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown errors: don't leak error details
  else {
    // Log error
    // console.log("Error xxxxxxxx 💥", err);
    // Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV == "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == "production") {
    let error = Object.assign(err);

    // console.log(error);
    // console.log(error.name);
    if (error.name == "CastError") {
      error = handleCastErrorDB(error);
    } else if (error.code == 11000) {
      error = handleDuplicateFieldsDB(error);
    } else if (error.name == "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    // else {
    //   // console.log("Error is unrecognized", error);
    // }
    sendErrorProd(error, res);
  }
};

export default globalErrorHandler;
