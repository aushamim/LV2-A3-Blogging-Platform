import { RequestHandler } from "express";
import { handleError } from "../utils/error";

const notFound: RequestHandler = (req, res) => {
  handleError(res, 404, "API route not found!", null);
};

export default notFound;
