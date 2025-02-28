import express from 'express'

const userRouter = express.Router()

// Import User Controllers
import {changeEmail, changePassword, createUser , login, userMsg} from '../Controllers/user.controller.js'
import { authencatication } from '../Middelwares/auth.middelware.js'

userRouter.route('/register').post(createUser)
userRouter.route('/login' ).post(login)
userRouter.route('/send-email').post(userMsg)

userRouter.use(authencatication);

userRouter.route('/change-email').patch(changeEmail)
userRouter.route('/change-password').patch(changePassword)


export default userRouter  