import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/errors/AppError";
import { UserGetInterface, UserInterface, UserPartialInterface } from "./user.interface";
import { UserModel } from "./user.model";

const getOne = async (payload: UserGetInterface) => {
  const response = await UserModel.findOne(payload);

  if (!response) throw new AppError(StatusCodes.NOT_FOUND, "User not found");

  if (response?.isBlocked) throw new AppError(StatusCodes.FORBIDDEN, "User is blocked");

  return response;
};

const createOne = async (user: UserInterface) => {
  return await UserModel.create(user);
};

const updateOne = async (id: string, userData: UserPartialInterface) => {
  return await UserModel.findByIdAndUpdate({ _id: id }, userData);
};

export const UserDB = { getOne, createOne, updateOne };
