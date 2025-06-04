import User from "../Models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../Utils/ApiError.js";
import sendEmail from "../Services/emailService.js";
const createUser = async (req, res, next) => {
  try {
    let user = req.body;
    console.log(user);
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

export const userMsg = async (req, res, next) => {
  try {
    let { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({
        status: "fail",
        data: "Must Provide User Name Or Email Or Message",
      });

    const msg = {
      from: "contact@etabema.com",
      to: "marketing@etabema.com",
      replyTo: email,
      subject: `Support - Etabema ${name}`,
      text: message,
    };
    await sendEmail(msg);
    res
      .status(200)
      .json({ status: "success", data: `Email Was Send Successfully` });
  } catch (error) {
    next(new ApiError(`Error From User Message ${error} `, 500));
  }
};
//change Email ===================================================================
const changeEmail = async (req, res, next) => {
  try {
    let { email, newEmail } = req.body;

    if (!email || !newEmail) {
      return next(new ApiError("Should be put the new and old email ", 400));
    }

    let user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError("Error to find user ", 404));
    }

    let existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      return next(new ApiError("The email is already exist", 400));
    }

    user.email = newEmail;
    await user.save();

    let token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "sucusses to update",
      user: { email: user.email },
    });
  } catch (error) {
    next(new ApiError("Error in updating email", 500));
  }
};

//change pawssord=========================================================================
const changePassword = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return next(
        new ApiError("should be put email,oldPassword and newPassword ", 400)
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ApiError("user not exist", 404));
    }

    const isPasswordCorrect = await bcryptjs.compare(
      oldPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(new ApiError("the old password is wrong", 401));
    }

    const isSamePassword = await bcryptjs.compare(newPassword, user.password);

    if (isSamePassword) {
      return next(
        new ApiError("New password is the same as the old password.", 400)
      );
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({
      status: "success",
      message: "sucussful to update",
    });
  } catch (error) {
    next(new ApiError("Error in updating password", 500));
  }
};

// Exports
export { createUser, login, changeEmail, changePassword };
