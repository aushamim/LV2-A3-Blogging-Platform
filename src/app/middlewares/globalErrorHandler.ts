import { ErrorRequestHandler } from "express";
import { handleError } from "../utils/error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  handleError(res, 500, "Something went wrong!", err);
};

export default globalErrorHandler;
