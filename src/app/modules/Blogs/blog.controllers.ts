import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/errors/AppError";
import { handleResponse } from "../../utils/handleResponse";
import { BlogInterface } from "./blog.interface";
import { BlogDB } from "./blog.services";

const create = catchAsync(async (req, res) => {
  const user = req.user;
  const blog = req.body;

  const blogPayload: BlogInterface = { title: blog.title, content: blog.content, author: user.userId };
  const response = await BlogDB.createOne(blogPayload);
  const formattedResponse = { _id: response?._id, title: response?.title, content: response?.content, author: response?.author };

  handleResponse(res, StatusCodes.CREATED, "Blog created successfully", formattedResponse);
});

const update = catchAsync(async (req, res) => {
  const user = req.user;
  const blogData = req.body;
  const blogId = req.params.blogId;

  const oldBlog = await BlogDB.getOne(blogId);

  // Author Check
  if (user?.userId !== oldBlog?.author?._id?.toString()) throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized");

  const response = await BlogDB.updateOne(blogId, blogData);
  const formattedResponse = { _id: response?._id, title: response?.title, content: response?.content, author: response?.author };

  handleResponse(res, StatusCodes.OK, "Blog updated successfully", formattedResponse);
});

export const BlogController = { create, update };
