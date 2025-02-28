import post from "../Models/blog.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ApiError from "../Utils/ApiError.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create new post========================================================================

const createPost = async (req, res, next) => {
  try {
    let { title, content, author } = req.body;
    if (!title || !content) {
      return res.status(400).json({ status: "Fail", data: "Title and content its required" });
    }

    let mediaFiles = req.files?.map((file) => `/Post/${file.filename}`) || [];

    let newPost = new post({ title, content, media: mediaFiles, author });
    await newPost.save();

    res.status(201).json({ status: "Success", data: newPost });
  } catch (error) {
    console.log(error);
    next(new ApiError("Error in create post", 500));
  }
};

//delete post============================================================

const deletePost = async (req, res, next) => {
    try {
        const posts = await post.findById(req.params.id);
        
        if (!posts) {
            return res.status(404).json({ status: "Fail", data: "Post not found" });
        }

        if (posts.author.toString() !== req.id) {
            return res.status(403).json({ status: "Fail", data: "You are not authorized to delete this post" });
        }

        if (posts.image) {   
            const imagePath = path.join(process.cwd(), post.image); 
            console.log(`Deleting image at: ${imagePath}`);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); 
                console.log("Image deleted successfully");
            } else {
                console.log("Image not found, skipping deletion");
            }
        }

        await post.remove();
        res.status(200).json({ status: "Success", data: "Post deleted successfully" });
    } catch (error) {
        next(new ApiError("Error from delete post", 500));
    }
};
//get all post============================================================================
const getAllPosts = async (req, res, next) => {
    try {
      let posts = await Post.find().populate("author", "name");
      if (!posts.length) return res.status(404).json({ status: "Fail", data: "Np posts here" });
  
      res.status(200).json({ status: "Success", data: posts });
    } catch (error) {
      next(new ApiError("Error in get posts ", 500));
    }
  };

//get post by ID============================================================================
const getPostById = async (req, res, next) => {
  let { id } = req.params;
  try {
    let post = await post.findById(id).populate("author", "name");
    if (!post) return res.status(404).json({ status: "Fail", data: `No post for this ID: ${id}` });

    res.status(200).json({ status: "Success", data: post });
  } catch (error) {
    next(new ApiError("Error in get post by ID", 500));
  }
};
// update post================================================================
const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newPostData = req.body; 

        const oldPost = await post.findById(id);
        if (!oldPost) {
            return res.status(404).json({ status: "Fail", data: `No post with ID ${id}` });
        }

        if (oldPost.image) {
            const oldImagePath = path.join(process.cwd(), oldPost.image);
            console.log(`Deleting old image at: ${oldImagePath}`);

            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); 
                console.log("Old image deleted successfully");
            } else {
                console.log("Old image not found, skipping deletion");
            }
        }

        if (req.file) {
            newPostData.image = `/Post/${req.file.filename}`; 
        }

        const updatedPost = await post.findByIdAndUpdate(id, newPostData, { new: true });

        res.status(200).json({ status: "Success", data: updatedPost });
    } catch (error) {
        next(new ApiError("Error from update post", 500));
    }
};


export { createPost, getAllPosts, getPostById, updatePost, deletePost };