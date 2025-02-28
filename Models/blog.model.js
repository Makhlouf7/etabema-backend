import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { 
        type: String,
        required: true, 
        trim: true 
        },
    content: { 
        type: String,
        required: true 
        },
    media: {
         type: String 
        }, 
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", required: true 
    },
    published: { 
        type: Boolean,
        default: false
               },  
    socialMediaShared: { 
        type: Boolean,
         default: false 
        }, 
  },
  { timestamps: true }
);


let post = mongoose.model("Post", postSchema);
export default post;