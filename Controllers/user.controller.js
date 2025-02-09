import User from "../Models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../Utils/ApiError.js";
import { SendUserEmail } from "../Middelwares/sendEmail.middleware.js";

const createUser = async (req, res, next) => {
  try {
    let user = req.body;
    let deplicateEmail = await User.findOne({ email: user.email });

    if (deplicateEmail)
      return next(new ApiError(`${user.email} Is Already Taken`, 400));

    user.createdAt = new Date().toISOString();
    let newUser = new User(user);
    await newUser.save();
    res.status(201).json({
      status: "Success",
      data: newUser,
    });
  } catch (error) {
    next(new ApiError(`Error On Create User`, 500));
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return next(new ApiError(`You must send email and password`, 400));

    let user = await User.findOne({ email: email });
    if (!user)
      return next(new ApiError(`Email or Password is not correct`, 404));

    let userPasswrod = await bcryptjs.compare(password, user.password);
    if (!userPasswrod)
      return next(new ApiError(`Email or Password is not correct`, 404));

    let token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      status: "Success",
      token: token,
    });
  } catch (error) {
    next(new ApiError(`Error From Login `, 500));
  }
};


export const userMsg = async (req , res ,next) =>{
  try {
    let {name , email , msg} = req.body
    if (! name || !email || !msg )
      return res.status(400).json({status : "fail" , data : "Must Provide User Name Or Email Or Message"})

    res.status(200).json({status : "success" , data : `Email Was Send Successfully`})
    SendUserEmail(name , email , msg)
  } catch (error) {
    next (new ApiError(`Error From User Message ${error} ` , 500))
  }
}
// Exports
export { createUser, login };
