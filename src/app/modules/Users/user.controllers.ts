import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/errors/AppError";
import { handleResponse } from "../../utils/handleResponse";
import { UserPartialInterface } from "./user.interface";
import { UserDB } from "./user.services";

const register = catchAsync(async (req, res) => {
  const user = req.body;
  const response = await UserDB.createOne(user);
  const { _id, name, email } = response;
  handleResponse(res, StatusCodes.CREATED, "User registered successfully", { _id, name, email });
});

const login = catchAsync(async (req, res) => {
  const user = req.body;

  const payload = { email: user.email };
  const response = await UserDB.getOne(payload);

  const isPasswordMatched = await bcrypt.compare(user.password, response.password);
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  // token generation
  const jwtData = { userId: response._id, role: response.role };
  const accessToken = jwt.sign(jwtData, config.jwtAccessSecret as string, { expiresIn: config.jwtAccessExpire as string });
  const refreshToken = jwt.sign(jwtData, config.jwtRefreshSecret as string, { expiresIn: config.jwtRefreshExpire as string });

  res.cookie("refreshToken", refreshToken, { secure: config.production, httpOnly: true });

  handleResponse(res, StatusCodes.OK, "User logged in successfully", { token: accessToken });
});

const block = catchAsync(async (req, res) => {
  const user = req.user;
  const userId = req.params.userId;

  if (user?.role !== "admin") throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");

  const payload: UserPartialInterface = { isBlocked: true };
  await UserDB.updateOne(userId, payload);

  handleResponse(res, StatusCodes.OK, "User blocked successfully", undefined);
});

export const UserController = { register, login, block };
