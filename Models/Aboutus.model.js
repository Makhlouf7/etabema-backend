import mongoose from "mongoose";

let aboutSchema = new mongoose.Schema({
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
  imageSeoBr: {
    type: String,
    trim: true,
    required: true,
  },
  imageSeoAr: {
    type: String,
    trim: true,
    required: true,
  },
  imageSeoEn: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: {
    type: String,
    trim: true,
  },
});

let Aboutus = mongoose.model("About", aboutSchema);

export default Aboutus;
