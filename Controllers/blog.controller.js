import Post from "../Models/blog.model.js";
import fs, { read } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ApiError from "../Utils/ApiError.js";
import catchAsync from "../Utils/catchAsync.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper functions =====

// Delete an image from the uploads folder
const deleteImage = (imagePath) => {
  fs.unlink(imagePath, (err) => {
    err && console.log("Couldn't find the image in uploads folder");
  });
};

// CRUD Functions =====
const createPost = catchAsync(async (req, res, next) => {
  const mediaFile = `/uploads/${req.file.filename}`;
  req.body.media = mediaFile;
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      post: newPost,
    },
  });
});

const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();
  res
    .status(200)
    .json({ status: "Success", results: posts.length, data: posts });
});

const getPostById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) return next(new ApiError(`No post for this ID: ${id}`, 404));

  res.status(200).json({ status: "Success", data: post });
});

const updatePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) next(new ApiError(`No post for this ID: ${id}`, 404));
  if (req.file) {
    const imagePath = path.join(process.cwd(), post.media);
    deleteImage(imagePath);
    req.body.media = `/uploads/${req.file.filename}`;
  }

  const newPost = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "Success",
    data: newPost,
  });
});

const deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) next(new ApiError(`No post for this ID: ${id}`, 404));

  const imagePath = path.join(process.cwd(), post.media);
  deleteImage(imagePath);

  await Post.findByIdAndDelete(id);
  res.status(204).json({ status: "Success", data: null });
});

export { createPost, getAllPosts, getPostById, updatePost, deletePost };
