import Order from "../Models/Order.model.js";
import ApiError from "../Utils/ApiError.js";
import {emailOptions} from '../Middelwares/email.js'

const createOrder = async (req ,res ,next)=>{
    try {
        let order = req.body
        
        order.createdAt = new Date().toISOString()
        order.user = req._id

        let newOrder = new Order(order)
        await newOrder.save()
        res.status(201).json({status : "success" , data : newOrder})

        emailOptions(newOrder.email , newOrder.status ,newOrder._id)

    } catch (error) {
        next(new  ApiError(`Error Form Create Order ` , 500) )
    }
}

const getAllOrders = async (req , res ,next)=>{
    try {
        let allOrders = await Order.find({})
        if (! allOrders)
            return res.status(404).json({status : "Fail" , data : `No Orders Created Yet !`})

        res.status(200).json({status : "success" , data : allOrders})

    } catch (error) {
        next(new ApiError(`Error From Get ALl Orders ` , 500))
    }
}

const getOrderById = async (req , res , next)=>{
    let {id} = req.params
    try {
        let order = await Order.findById(id)
        if (! order)
            return res.status(404).json({status  :"Fail" , data : `No Order With This ID ${id}`})

        res.status(200).json({status : "success" , data : order})
    } catch (error) {
        next(new ApiError(`Error From Get Order By ID` , 500))
    }
}

const deleteOrder = async (req , res )=>{
    let {id} = req.params
    try {
        let item = await Order.findByIdAndDelete(id)
        if (!item)
            return res.status(404).json({status : "Fail" , data : `No Data With This ${id} ID`})

        res.status(200).json({status : "Success" , data : item})
    } catch (error) {
        next(new ApiError(`Error From Delete By ID In Static`) , 500)
        
    }
}

const updateOrder = async (req ,res , next)=>{
    let newData = req.body;
    let { id } = req.params;

    try {
        let oldData = await Order.findById(id);
        if (!oldData)
        return res
            .status(404)
            .json({ status: "Fail", data: `No Data For This Id : ${id}` });

        let data = await Order.findByIdAndUpdate(
            id,
            { ...newData },
            { new: true }
        );
        res.status(200).json({ status: "Success", data: data });

        emailOptions(data.email , data.status , data._id)

    } catch (error) {
        console.log(error);
        
        next(new ApiError(`Error From Update Data`, 500));
    }
}
export {
    createOrder , getAllOrders, getOrderById ,deleteOrder,updateOrder
}