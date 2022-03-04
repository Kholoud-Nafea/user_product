import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

//create user schema
const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 200,
   },
   password: {
      type: String,
      requirde: true,
      minlength: 5,
      maxlength: 1024,
   },
   isAdmin: {
      type: Boolean,
      required: true,
      default: false,
   },
})

//for decrypting the password
userSchema.methods.matchPassword = async function (enteredPassword){
   return await bcrypt.compare(enteredPassword, this.password)
}

// bcrypt the password before saving to data base
userSchema.pre('save', async function (next) { //automatically run pre save we don't need to bring it to userController

   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)

   next()
})




const User = mongoose.model('User', userSchema)
export default User