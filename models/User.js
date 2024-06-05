const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
     lastName: {
          type: String,
          trim: true,
          required: [true, "Last Name is required"]
     },
     firstName: {
          type: String,
          trim: true,
          required: [true, "First Name is required"]
     },
     middleName: {
          type: String
     },
     nameSuffix: {
          type: String
     },
     email: {
          type: String,
          required: [true, "Email is required"],
          unique: true,
          trim: true,
          lowercase: true,
          validate: {
               validator: function(v){
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
               },
               message: "Please enter a valid email"
          }
     },
     mobileNo: {
          type: String,
          required: [true, "Mobile Number is required"],
          minlength: 11
     },
     password: {
          type: String,
          required: [true, "Password is required"]
     },
     isAdmin: {
          type: Boolean,
          default: false
     },
     financingType: {
          type: String,
          required: [true, "Financing Type is required"]
     }

}, {timestamps: true});



module.exports = mongoose.model("User", userSchema);