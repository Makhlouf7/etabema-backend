import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

let URL = process.env.DB_URL 


export function DBConnection (){
    mongoose.connect(URL) 
    .then(()=> console.log('Connected To DataBase')
    )
    .catch(()=> console.log("Cann't Connect To DataBase"))
} 
