import mongoose from "mongoose";
// const accordionSchema = new mongoose.Schema({
//   titleEn: { type: String, trim: true },
//   textEn: { type: String, trim: true },
//   titleAr: { type: String, trim: true },
//   textAr: { type: String, trim: true },
//   titleBr: { type: String, trim: true },
//   textBr: { type: String, trim: true },
// });

let productSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  categoryName: {
    type: String,
    trim: true,
    required: true,
  },
  titleAr: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, "العنوان يجب أن يكون على الأقل 3 أحرف"],
  },
  titleEn: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minlength: [3, "Title must be at least 3 characters"],
  },
  titleBr: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, "O título deve ter pelo menos 3 caracteres"],
  },
  textAr: { type: String, trim: true, required: true },
  textEn: { type: String, trim: true, required: true },
  textBr: { type: String, trim: true, required: true },
  btnTextAr: { type: String, trim: true, required: true },
  btnTextEn: { type: String, trim: true, required: true },
  btnTextBr: { type: String, trim: true, required: true },
  productImage: { type: String, trim: true, required: true },
  ImageAltAr: { type: String, trim: true, required: true },
  ImageAltEn: { type: String, trim: true, required: true },
  ImageAltBr: { type: String, trim: true, required: true },
  DetailsTextAr: { type: String, trim: true, required: true },
  DetailsTextEn: { type: String, trim: true, required: true },
  DetailsTextBr: { type: String, trim: true, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  accordion: { type: String, trim: true, required: true },
  position: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("find", function (next) {
  this.sort({ position: 1 });
  next();
});

let Products = mongoose.model("Products", productSchema);
export default Products;
