import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import stripeRoutes from './routes/stripeRoutes.js'

//config data for .env file
dotenv.config()

//connect to data base
connectDB()

const app = express()

//server running mode
if (process.env.NODE_ENV === 'development'){
   app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/payment',stripeRoutes)

//listening to server
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))