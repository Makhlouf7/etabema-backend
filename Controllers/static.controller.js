import StaticData from "../Models/Static.model.js";
import ApiError from "../Utils/ApiError.js";


const createStatic = async (req , res , next )=>{
    let data = req.body
    try {
        data.createdAt = new Date().toISOString()
        let newData = new StaticData(data)
        await newData.save()
        res.status(201).json({status : "Success" , data : newData})
    } catch (error) {
        next(new ApiError(`Error From Create Static` , 500))
    }
}

const getAllStatic = async (req , res , next )=>{
    try {
        let allData = await StaticData.find()
        if (!allData)
            return res.status(404).json({status :"Fail" , data : `No Static Founded`})

        res.status(200).json({status : "Success" , data : allData})
    } catch (error) {
        next(new ApiError(`Error From Get All Static Data` , 500))
    }
}

const getElementById = async (req , res ,next )=>{
    let {id} = req.params
    try {
        let data = await StaticData.findById(id)
        if (! data)
            return res.status(404).json({status : "Fail" , data : `No Data With This ${id} ID`})

        res.status(200).json({status : "Success" , data : data})
    } catch (error) {

        next(new ApiError(`Error From Get By ID In Static`) , 500)
    }
}

const deleteElementById = async (req , res , next)=>{
    let {id} = req.params
    try {
        let item = await StaticData.findByIdAndDelete(id)
        if (!item)
            return res.status(404).json({status : "Fail" , data : `No Data With This ${id} ID`})

        res.status(200).json({status : "Success" , data : item})
    } catch (error) {
        next(new ApiError(`Error From Delete By ID In Static`) , 500)
        
    }
}

const updateElement = async (req , res , next)=>{
    let newData = req.body;
    let { id } = req.params;

    try {
        let oldData = await StaticData.findById(id);
        if (!oldData)
        return res
            .status(404)
            .json({ status: "Fail", data: `No Data For This Id : ${id}` });

        let data = await StaticData.findByIdAndUpdate(
            id,
            { ...newData },
            { new: true }
        );
        res.status(200).json({ status: "Success", data: data });
    } catch (error) {
        next(new ApiError(`Error From Update Data`, 500));
    }
}
export {
    createStatic , getAllStatic ,getElementById ,deleteElementById ,updateElement
}