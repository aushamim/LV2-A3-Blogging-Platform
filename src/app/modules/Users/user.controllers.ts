import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { handleResponse } from "../../utils/handleResponse";
import { UserDB } from "./user.services";

const register = catchAsync(async (req, res) => {
  const user = req.body;
  const response = await UserDB.createOne(user);
  const { _id, name, email } = response;
  handleResponse(res, StatusCodes.CREATED, "User registered successfully", { _id, name, email });
});

export const UserController = { register };
