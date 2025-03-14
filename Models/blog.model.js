import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  titleEn: {
    type: String,
    required: [true, "Post must have title"],
    trim: true,
  },
  titleBr: {
    type: String,
    required: [true, "Post must have title"],
    trim: true,
  },
  titleAr: {
    type: String,
    required: [true, "Post must have title"],
    trim: true,
  },
  contentEn: {
    type: String,
    required: [true, "Post must have content"],
    trim: true,
  },
  contentBr: {
    type: String,
    required: [true, "Post must have content"],
    trim: true,
  },
  contentAr: {
    type: String,
    required: [true, "Post must have content"],
    trim: true,
  },
  goToURL: String,
  media: {
    type: String,
    required: [true, "Post must have an image"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
