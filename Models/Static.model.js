import mongoose from "mongoose";

let staticSchema = new mongoose.Schema({
  // Logo
  logoURL: {
    type: String,
    trim: true,
    required: true,
  },
  // Home
  homeHeroURL: {
    type: String,
    trim: true,
    required: true,
  },
  homeIntroductionTitleEn: {
    type: String,
    trim: true,
    required: true,
  },
  homeIntroductionTitleAr: {
    type: String,
    trim: true,
    required: true,
  },
  homeIntroductionTitleBr: {
    type: String,
    trim: true,
    required: true,
  },
  homeIntroductionDescriptionEn: {
    type: String,
    trim: true,
    required: true,
  },
  homeIntroductionDescriptionAr: {
    type: String,
    trim: true,
    required: true,
  },
  homeIntroductionDescriptionBr: {
    type: String,
    trim: true,
    required: true,
  },
  homeCardsTitleEn: {
    type: String,
    trim: true,
    required: true,
  },
  homeCardsTitleAr: {
    type: String,
    trim: true,
    required: true,
  },
  homeCardsTitleBr: {
    type: String,
    trim: true,
    required: true,
  },
  homeCardsDescriptionEn: {
    type: String,
    trim: true,
    required: true,
  },
  homeCardsDescriptionAr: {
    type: String,
    trim: true,
    required: true,
  },
  homeCardsDescriptionBr: {
    type: String,
    trim: true,
    required: true,
  },
  // Services
  servicesHeroURL: {
    type: String,
    trim: true,
    required: true,
  },
  servicesHeroSeoAr: {
    type: String,
    trim: true,
    required: true,
  },
  servicesHeroSeoEn: {
    type: String,
    trim: true,
    required: true,
  },
  servicesHeroSeoBr: {
    type: String,
    trim: true,
    required: true,
  },
  // Categories
  categoriesHeroURL: {
    type: String,
    trim: true,
    required: true,
  },
  categoriesHeroSeoAr: {
    type: String,
    trim: true,
    required: true,
  },
  categoriesHeroSeoEn: {
    type: String,
    trim: true,
    required: true,
  },
  categoriesHeroSeoBr: {
    type: String,
    trim: true,
    required: true,
  },

  // About
  aboutHeroURL: {
    type: String,
    trim: true,
    required: true,
  },
  aboutHeroSeoAr: {
    type: String,
    trim: true,
    required: true,
  },
  aboutHeroSeoEn: {
    type: String,
    trim: true,
    required: true,
  },
  aboutHeroSeoBr: {
    type: String,
    trim: true,
    required: true,
  },

  // Blogs
  postsHeroURL: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: {
    type: String,
    trim: true,
  },
});

let StaticData = mongoose.model("StaticData", staticSchema);
export default StaticData;
