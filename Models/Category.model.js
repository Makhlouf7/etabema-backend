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

  createdAt: {
    type: String,
  },
});

// categorySchema.pre('save' , function(next ){

//     let catogery  = this
//     if (this.isModified(this.titleEn || catogery.isNew)){
//         catogery.slug = slugify(catogery.titleEn , {lower : true})
//     }
//     next()
// })

// slug : {
//     type : String ,
//     unique : true ,
//     lowercase : true
// },

let Category = mongoose.model("Category", categorySchema);
export default Category;
