import express from 'express'

const userRouter = express.Router()

// Import User Controllers
import {createUser , login, userMsg} from '../Controllers/user.controller.js'

userRouter.route('/register').post(createUser)
userRouter.route('/login' ).post(login)
userRouter.route('/send-email').post(userMsg)

export default userRouter