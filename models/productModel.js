import mongoose from "mongoose";

//create schema for Products
const productSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   brand: {
      type: String,
      required: true,
   },
   category: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
      default:0,
   },
})

const Product = mongoose.model('Product', productSchema)
export default Product