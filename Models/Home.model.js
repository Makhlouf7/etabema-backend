import mongoose from "mongoose";

let homeSchema = new mongoose.Schema({
  titleEn: {
    type: String,
    trim: true,
    required: true,
  },
  titleAr: {
    type: String,
    trim: true,
    required: true,
  },
  titleBr: {
    type: String,
    trim: true,
    required: true,
  },
  descriptionEn: {
    type: String,
    trim: true,
    required: true,
  },
  descriptionAr: {
    type: String,
    trim: true,
    required: true,
  },
  descriptionBr: {
    type: String,
    trim: true,
    required: true,
  },
  imageSrc: {
    type: String,
    trim: true,
    required: true,
  },
  seoEn: {
    type: String,
    trim: true,
    required: true,
  },
  seoAr: {
    type: String,
    trim: true,
    required: true,
  },
  seoBr: {
    type: String,
    trim: true,
    required: true,
  },
  btnTextEn: {
    type: String,
    trim: true,
    required: true,
  },
  btnTextAr: {
    type: String,
    trim: true,
    required: true,
  },
  btnTextBr: {
    type: String,
    trim: true,
    required: true,
  },
  btnURL: {
    type: String,
    trim: true,
    required: true,
  },
  position: Number,
  createdAt: {
    type: String,
    trim: true,
  },
});

homeSchema.pre("find", function (next) {
  this.sort({ position: 1 });
  next();
});

let Home = mongoose.model("Home", homeSchema);
export default Home;
