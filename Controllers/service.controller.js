import Service from "../Models/Services.model.js";
import ApiError from "../Utils/ApiError.js";
import fs from 'fs'
import path from 'path'
import { promisify } from "util";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createService = async (req, res, next) => {
    let data = req.body;
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        if (req.file) {
            data.imageSrc = `/uploads/${req.file.filename}`;
        }
        data.createdAt = new Date().toISOString();

        let newData = new Service(data);
        await newData.save();

        res.status(201).json({ status: "Success", data: newData });
    } catch (error) {
        console.error("Create Service Error:", error); // عرض الخطأ في الكونسول
        next(new ApiError(error.message || "Error From Create Home Content", 500));
    }
};


const getAllServices = async (req , res , next )=>{
    try {
        let allData = await Service.find()
        if (! allData)
            return res.status(404).json({status : "Fail" , data : `No Data For Home`})

        res.status(200).json({status : "success" , data : allData})
    } catch (error) {
        next( new ApiError(`Error From Get All Home Content` , 500))
        
    }
}


const getServiceById = async (req , res , next )=>{
    let {id} = req.params 
    try {
        let item = await Service.findById(id)
        if (! item)
            return res.status(404).json({status : "Fail" , data : `No Content For This ${id} ID`})

        res.status(200).json({status : "success" , data : item})
    } catch (error) {
        next( new ApiError(`Error From Get Home Item Content` , 500))
        
    }
}
const unlinkAsync = promisify(fs.unlink);

const deleteServiceById = async (req, res, next) => {
    let { id } = req.params;
    try {
        let item = await Service.findByIdAndDelete(id);
        if (!item) {
            return res.status(404).json({ status: "Fail", data: `No Content For This ${id} ID` });
        }

        if (item.imageSrc) {
            const imagePath = path.join(".", item.imageSrc); // تأكد من تحديد المسار بشكل صحيح
            fs.access(imagePath, fs.constants.F_OK, async (err) => {
                if (!err) {
                    try {
                        await unlinkAsync(imagePath);
                    } catch (unlinkError) {
                        console.error("Error deleting image:", unlinkError);
                    }
                }
            });
        }

        res.status(200).json({ status: "success", data: item });
    } catch (error) {
        next(new ApiError("Error From Delete Service", 500));
    }
};

// const deleteServiceById = async (req, res , next)=>{
//     let {id} = req.params
//     try {
//         let item = await Service.findByIdAndDelete(id)
//         if (!item)
//             return res.status(404).json({status : "Fail" , data : `No Content For This ${id} ID`})

//         if (item.imageSrc) {
//             const imagePath =  item.imageSrc;
//                 fs.unlinkSync(`.${imagePath}`);
//         }
//         res.status(200).json({status : "success" , data : item})

//     } catch (error) {
//         next( new ApiError(`Error From Delete Home Content` , 500))
        
//     }
// }


const updateServiceById = async (req, res, next) => {
    let newData = req.body;
    let { id } = req.params;

    try {
        let oldData = await Service.findById(id);
        if (!oldData) {
            return res.status(404).json({ status: "Fail", data: `No Data For This ID: ${id}` });
        }

        if (req.file) {
            if (oldData.imageSrc) {
                const oldImagePath = path.join(process.cwd(), oldData.imageSrc); 
                if (fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (err) => {
                        if (err) console.error(" Error deleting old image:", err);
                        else console.log(" Old image deleted successfully:", oldImagePath);
                    });
                }
            }
            newData.imageSrc = `/uploads/${req.file.filename}`;
        }

        let updatedData = await Service.findByIdAndUpdate(id, { ...newData }, { new: true });

        res.status(200).json({ status: "Success", data: updatedData });

    } catch (error) {
        console.error(" Update Service Error:", error);
        next(new ApiError(`Error From Update Service Data: ${error.message}`, 500));
    }
};


export {
    createService , getAllServices , getServiceById , updateServiceById , deleteServiceById
}