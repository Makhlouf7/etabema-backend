import Category from "../Models/Category.model.js";
import Products from "../Models/Products.model.js";
import ApiError from "../Utils/ApiError.js";
import { ValidationError } from "../Utils/ValidationError.js";

const createCategory = async (req, res, next) => {
    try {
        let category = req.body;
        // console.log(category);

        // Must Unique
        const existCategory = await Category.findOne({
            titleEn: category.titleEn,
        });
        if (existCategory) {
            return res
                .status(400)
                .json({ status: "Fail", data: "This Category is already exists" });
        }

            category.createdAt = new Date().toISOString();
            category.userId = req.id
            let newCategory = new Category(category);
            await newCategory.save();
            res.status(201).json({ status: "Success", data: newCategory });
    } catch (error) {
    // Handle Validation error
        if (error.name === "ValidationError") {
            ValidationError(error, res);
        }
        console.log(error);

        next(new ApiError(`Error From Create Category`, 500));
    }
};


const getAllCategories = async (req , res , next)=>{
    try {
        let categories = await Category.find()
        if (! categories) 
            return res.status(404).json({status : "Fail" , data : "No Categories Found"})

        res.status(200).json({status : "Success" , data  : categories})
    } catch (error) {
        next( new ApiError(`Error From Get All Categories` , 500))
    }
}

const getCategoryById = async (req , res , next )=>{
    let {id} = req.params
    try {
        let category = await Category.findById(id)
        if (! category ) 
            return res.status(404).json({status : "Fail" , data : `No Category with this Id : ${id}`})

        res.status(200).json({status : "Success" , data : category})

    } catch (error) {
        next(new ApiError(`Error From Get Category By Id` , 500 ))
    } 
}

const getAllProductInCategory = async (req , res , next )=>{
    let {id} = req.params
    try {
        
        let category = await Category.findById(id)
        if (! category )
            return res.status(404).json({status : "Fail" , data : `No Category With This Id : ${id}`})
        
        let ProductsInCategory = await Products.find({category : id})
        if (!ProductsInCategory)
            return res.status(404).json({status : "Fail" , ProductsInCategory : `No Products In This Category !`})

        res.status(200).json({status : "success" , ProductsInCategory : ProductsInCategory})

    } catch (error) {
        next(new ApiError(`Error From Get All Products In Category`))
    }
}

const deleteCategory = async (req , res , next )=>{
    let {id} = req.params
    try {
        let category = await Category.findById(id)
        if (! category)
            return res.status(404).json({status : "Fail" , data : `No Category with this Id : ${id}`})

        let productsInCategory = await Products.deleteMany({category : id})
        await Category.findByIdAndDelete(id)


        res.status(200).json({status : "Success" , data : category , dataInCategory : productsInCategory})
    } catch (error) {
        next( new ApiError(`Error From Delete Category`))
    }
}
const updateCategory = async (req , res , next )=>{
    let category = req.body
    let {id} = req.params
    try {
        let oldCategory = await Category.findById(id)
        if (! oldCategory)
            return res.status(404).json({status : 'Fail' , data : `No Category with this Id : ${id}`})

        let newCategory = await Category.findByIdAndUpdate(id , {...category} , {new : true})

        res.status(200).json({status : "Success" , data : newCategory})
        
    } catch (error) {
        next( new ApiError(`Error From Update Category ` , 500))
    }
}
export { createCategory  ,getAllCategories , getCategoryById , deleteCategory , updateCategory , getAllProductInCategory};

