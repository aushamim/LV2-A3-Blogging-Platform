import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/errors/AppError";
import { handleResponse } from "../../utils/handleResponse";
import { BlogInterface } from "./blog.interface";
import { BlogDB } from "./blog.services";

const getAll = catchAsync(async (req, res) => {
  const queryPayload = req.query;

  const response = await BlogDB.getAll(queryPayload);
  const formattedResponse = response.map((blog) => {
    return { _id: blog?._id, title: blog?.title, content: blog?.content, author: blog?.author };
  });

  handleResponse(res, StatusCodes.OK, "Blogs fetched successfully", formattedResponse);
});

const createOne = catchAsync(async (req, res) => {
  const user = req.user;
  const blog = req.body;

  const blogPayload: BlogInterface = { title: blog.title, content: blog.content, author: user.userId };
  const response = await BlogDB.createOne(blogPayload);
  const formattedResponse = { _id: response?._id, title: response?.title, content: response?.content, author: response?.author };

  handleResponse(res, StatusCodes.CREATED, "Blog created successfully", formattedResponse);
});

const updateOne = catchAsync(async (req, res) => {
  const user = req.user;
  const blogData = req.body;
  const blogId = req.params.id;

  const oldBlog = await BlogDB.getOne(blogId);

  // Author Check
  if (user?.userId !== oldBlog?.author?._id?.toString()) throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");

  const response = await BlogDB.updateOne(blogId, blogData);
  const formattedResponse = { _id: response?._id, title: response?.title, content: response?.content, author: response?.author };

  handleResponse(res, StatusCodes.OK, "Blog updated successfully", formattedResponse);
});

const deleteOne = catchAsync(async (req, res) => {
  const user = req.user;
  const blogId = req.params.id;

  const oldBlog = await BlogDB.getOne(blogId);

  // Author Check
  if (user.role === "user" && user?.userId !== oldBlog?.author?._id?.toString()) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");
  }

  await BlogDB.deleteOne(blogId);
  handleResponse(res, StatusCodes.OK, "Blog deleted successfully", undefined);
});

export const BlogController = { getAll, createOne, updateOne, deleteOne };
