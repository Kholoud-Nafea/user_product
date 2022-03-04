import express from "express";
import { protect, admin } from '../middleware/authMiddleware.js'
import {
   getProducts,
   deleteProduct, 
   updateProduct, 
   createProduct 
} from "../controller/productController.js";
const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
   .route('/:id').delete(protect, admin, deleteProduct)
   .put(protect, admin, updateProduct)
export default router