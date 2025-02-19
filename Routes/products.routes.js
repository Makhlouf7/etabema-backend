import express from 'express'
import {craeteProduct, deleteProductById, getAllProducts, getProductById, updateProductById} from '../Controllers/products.controller.js'
import { authencatication, restrictTo } from '../Middelwares/auth.middelware.js'
import upload from '../Middelwares/uploadImage.js'

const productRouter = express.Router()

productRouter.route('/').get(getAllProducts)
productRouter.route('/:id').get(getProductById)

 productRouter.use(authencatication)
productRouter.route('/create-product').post(restrictTo('admin'),  upload.single('productImage'),craeteProduct )
productRouter.route('/:id').delete(restrictTo('admin'), deleteProductById)
productRouter.route('/:id') .patch(restrictTo('admin') , upload.single('productImage') ,updateProductById)


export default productRouter