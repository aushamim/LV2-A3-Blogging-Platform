import { StatusCodes } from "http-status-codes";
import { FilterQuery } from "mongoose";
import AppError from "../../utils/errors/AppError";
import { BlogInterface, BlogQueryParamsInterface, BlogUpdateInterface } from "./blog.interface";
import { BlogModel } from "./blog.model";

const getAll = async (queryPayload: BlogQueryParamsInterface) => {
  const { search, sortBy, sortOrder, filter } = queryPayload;

  // Build Query
  const query: FilterQuery<BlogInterface> = {};

  if (search) {
    query.$or = [{ title: { $regex: search, $options: "i" } }, { content: { $regex: search, $options: "i" } }];
  }

  if (filter) {
    query.author = filter;
  }

  const sortField = sortBy || "createdAt";
  const sortDirection = sortOrder === "desc" ? -1 : 1;

  // Get Blogs
  const response = await BlogModel.find(query)
    .sort({ [sortField]: sortDirection })
    .populate("author", "_id name email");

  return response;
};

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

export const BlogDB = { getAll, getOne, createOne, updateOne, deleteOne };
