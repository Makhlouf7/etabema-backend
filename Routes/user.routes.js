import express from 'express'

const userRouter = express.Router()

// Import User Controllers
import {createUser , login} from '../Controllers/user.controller.js'

userRouter.route('/register').post(createUser)
userRouter.route('/login' ).post(login)


export default userRouter