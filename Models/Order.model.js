import mongoose from "mongoose";

let orderSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    title : {
        type : String,
        trim : true,
    },
    email : {
        type : String,
        trim : true,
        required : true
    },
    status : {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
        default: 'Pending',
        required : true
    },
    ShipmentLink :{
        type : String,
        trim : true
    },
    ShipmentCode : {
        type : String,
        trim : true
    },
    messageAr : {
        type : String ,
        trim : true
    },
    messageEn : {
        type : String ,
        trim : true
    },
    messageBr : {
        type : String ,
        trim : true
    },
    createdAt : {
        type : String
    }
}) 

let Order = mongoose.model('Order' , orderSchema)
export default Order