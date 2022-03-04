import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
   const products = await Product.find({})

   res.json(products)
})

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id)
   if(product) {
      await product.remove()
      res.json({ message: 'Product removed' })
   } else {
      res.status(404)
      throw new Error('Product not found')
   }
})

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
   const { 
      name,
      price,
      description,
      brand,
      category,
   } = req.body
   const product = await Product.findById(req.params.id)

   if(product) {
      product.name = name
      product.price = price
      product.description = description
      product.brand = brand
      product.category = category

      const updatedProduct = await product.save()
      res.json(updatedProduct)
   } else {
      res.status(404)
      throw new Error('Product not found')
   }
})

// @desc   Create a product
// @route  POST /api/products
// @access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
   const { 
      name,
      price,
      description,
      brand,
      category,
   } = req.body

   const product = await Product.create({
      name,
      price,
      description,
      brand,
      category,
   })
   if (product) {
      res.status(201).json({
         _id: product._id,
         name: product.name,
         price: product.price,
         description: product.description,
         brand: product.brand,
         category: product.category
      })
   } else {
      res.status(400)
      throw new Error('Invalid product data')
   }
})

export { getProducts, deleteProduct, updateProduct, createProduct }