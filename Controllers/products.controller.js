import Category from "../Models/Category.model.js";
import Products from "../Models/Products.model.js";
import ApiError from "../Utils/ApiError.js";
import { ValidationError } from "../Utils/ValidationError.js";

const craeteProduct = async (req, res, next) => {
    try {
        let product = req.body;
        let categoryTitle = req.body.categoryName;
        // Must Unique
        const existProduct = await Products.findOne({ titleEn: product.titleEn });
        if (existProduct) {
            return res
                .status(400)
                .json({ status: "Fail", data: "This Product is Already Exists" });
        }

        let compareCategory = await Category.findOne({ titleEn: categoryTitle });
        if (!compareCategory) {
            return res
                .status(404)
                .json({ status: "Fail", data: "No Category Title with this name" });
        }

        product.createdAt = new Date().toISOString();
        product.category = compareCategory._id;
        let newProduct = new Products(product);
        await newProduct.save();
        res.status(201).json({ status: "Success", data: newProduct });
    } catch (error) {
        if (error.name == "ValidationError") {
        ValidationError(error, res);
        }
        next(new ApiError("Error From Create Product", 500));
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        let products = await Products.find().populate("category");
        if (!products)
        return res
            .status(404)
            .json({ status: "Fail", data: "No Products Available" });

        res.status(200).json({ status: "Success", data: products });
    } catch (error) {
        console.log(error);

        next(new ApiError("Error From Get All Products", 500));
    }
};

const getProductById = async (req, res, next) => {
    let { id } = req.params;
    try {
        let product = await Products.findById(id).populate("category");
        if (!product)
        return res
            .status(404)
            .json({ status: "Fail", data: `No Product With This ID : ${id}` });

        res.status(200).json({ status: "Success", data: product });
    } catch (error) {
        next(new ApiError("Error From Get Product By Id", 500));
    }
};

const deleteProductById = async (req, res, next) => {
    let { id } = req.params;

    try {
        let product = await Products.findByIdAndDelete(id);
        if (!product)
        return res
            .status(404)
            .json({ status: "Fail", data: `No Product With This ID : ${id}` });

        res.status(200).json({ status: "Success", data: product });
    } catch (error) {
        next(new ApiError("Error From Delete Product", 500));
    }
};

const updateProductById = async (req , res , next )=>{
    let newProduct = req.body
    let {id} = req.params
    try {
        let oldProduct = await Products.findById(id)
        if (! oldProduct)
            return res.status(404).json({status : "Fail" , data : `No Product With This ID  : ${id}`})

        let allData = await Products.findByIdAndUpdate(id , {...newProduct} , {new : true})

        res.status(200).json({statusc : "Success" , data : allData})

    } catch (error) {
        next( new ApiError('Error From Update Product', 500))
    }
}


export { craeteProduct, getAllProducts, getProductById, deleteProductById ,updateProductById };
