import mongoose from "mongoose";

let productSchema  = new mongoose.Schema({

    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required : true
    },
    categoryName : {
        type : String,
        trim : true ,
        required  : true
    }, 
    titleAr : {
        type : String , trim : true , required : true, 
        minLenght : [3 , "Title must be at least 3 characters"]
    },
    // Title En Is Unique
    titleEn : {
        type : String , trim : true , required : true, unique : true,
        minLenght : [3 , "Title must be at least 3 characters"]
    },
    titleBr : {
        type : String , trim : true , required : true, 
        minLenght : [3 , "Title must be at least 3 characters"]
    },
    textAr : {
        type : String , trim : true , required : true ,
    },
    textEn : {
        type : String , trim : true , required : true ,
    },
    textBr : {
        type : String , trim : true , required : true ,
    },
    btnTextAr : {
        type : String , trim : true , required : true ,
    },
    btnTextEn : {
        type : String , trim : true , required : true ,
    },
    btnTextBr : {
        type : String , trim : true , required : true ,
    },
    productImage :{
        type : String , trim : true , required : true ,
    },
    ImageAltAr : {
        type : String , trim : true , required : true ,
    },
    ImageAltEn : {
        type : String , trim : true , required : true ,
    },
    ImageAltBr : {
        type : String , trim : true , required : true ,
    },
    DetailsTextAr : {
        type : String , trim : true , required : true ,
    },
    DetailsTextEn : {
        type : String , trim : true , required : true ,
    },
    DetailsTextBr : {
        type : String , trim : true , required : true ,
    },
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },
    createdAt : {
        type : String , trim : true , required : true
    }
})

let Products = mongoose.model('Products' , productSchema)

export default Products