import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
        validator: function (value) {
            return /^[a-zA-Z]{3,12}[0-9]{0,9}\.admin(@)(gmail|yahoo)(.com)$/.test(
            value
            );
        },
            message: (value) => `${value} Is Not Valid Email`,
        },
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: [8, "Password Must Be Greater Than 8 Characters"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    createdAt : {
        type : String
    }
});

UserSchema.pre('save' , async function (next) {
    const user = this 
    if (! user.isModified('password')){
        return next()
    }
    user.password = await bcryptjs.hash(user.password , 8)
    next()
})


let User = mongoose.model('User' , UserSchema)

export default User