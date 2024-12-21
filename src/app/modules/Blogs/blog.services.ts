import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/errors/AppError";
import { BlogInterface, BlogUpdateInterface } from "./blog.interface";
import { BlogModel } from "./blog.model";

const getOne = async (id: string) => {
  const response = await BlogModel.findById(id).populate("author", "_id name email");

  if (!response) throw new AppError(StatusCodes.NOT_FOUND, "Blog not found");

  return response;
};

const createOne = async (blog: BlogInterface) => {
  const { _id } = await BlogModel.create(blog);
  return getOne(_id.toString());
};

const updateOne = async (id: string, blogData: BlogUpdateInterface) => {
  await BlogModel.findByIdAndUpdate({ _id: id }, blogData, { new: true });
  return getOne(id);
};

const deleteOne = async (id: string) => {
  return await BlogModel.findByIdAndDelete({ _id: id });
};

export const BlogDB = { getOne, createOne, updateOne, deleteOne };
