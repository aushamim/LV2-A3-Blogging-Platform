import { UserInterface } from "./user.interface";
import { UserModel } from "./user.model";

const createOne = async (user: UserInterface) => {
  return await UserModel.create(user);
};

export const UserDB = { createOne };
