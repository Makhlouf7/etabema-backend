import mongoose from "mongoose";

let categorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  titleEn: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Title is short"],
    unique: true,
  },
  titleAr: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Title is short"],
  },
  titleBr: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Title is short"],
  },
  imageSrc: {
    type: String,
    //required : true,
    trim: true,
  },
  seoEn: {
    type: String,
    trim: true,
    // required : true
  },
  seoAr: {
    type: String,
    trim: true,
    // required : true
  },
  seoBr: {
    type: String,
    trim: true,
    // required : true
  },

  descriptionEn: {
    type: String,
    trim: true,
    // required : true
  },
  descriptionAr: {
    type: String,
    trim: true,
    // required : true
  },
  descriptionBr: {
    type: String,
    trim: true,
    // required : true
  },
  btnTextEn: {
    type: String,
    trim: true,
    // required : true
  },
  btnTextAr: {
    type: String,
    trim: true,
    // required : true
  },
  btnTextBr: {
    type: String,
    trim: true,
    // required : true
  },
  position: Number,
  createdAt: {
    type: String,
    trim: true,
  },
});

categorySchema.pre("find", function (next) {
  this.sort({ position: 1 });
  next();
});

let Category = mongoose.model("Category", categorySchema);
export default Category;
