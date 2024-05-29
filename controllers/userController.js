const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const getUserDetails = (req, res) => {
     User.findById(req.user._id)
     .then(user => res.json(user))
     .catch(() => res.sendStatus(403));
}

const getAllUsers =  (req, res) => {
     User.find({})
     .then(users => res.json(users))
     .catch((err) => res.json(err.message));
}

const registerUser = (req, res) => {
     User.findOne({email: req.body.email})
     .then(userExist => {

          if(userExist)
          return res.status(409).json("Email already exists");

          if(req.body.password.length < 8)
          return res.status(409).json("Password must contain atleast a minimum of 8 characters");     
          
          newUser = new User({
               lastName: req.body.lastName,
               firstName: req.body.firstName,
               middleName: req.body.middleName,
               nameSuffix: req.body.nameSuffix,
               email: req.body.email,
               mobileNo: req.body.mobileNo,
               password: bcrypt.hashSync(req.body.password, 10)
          })
     
          newUser.save()
          .then(newUserRegistered => res.json(newUserRegistered))
          .catch(err => res.status(400).json(err.message));
     })
     .catch(() => res.sendStatus(500)); 
}

const loginUser = (req, res) => {
     User.findOne({email: req.body.email})
     .then(user => {

          if(!user)
          return res.status(400).json("Incorrect Email or Password")

          bcrypt.compare(req.body.password, user.password)
          .then(isPasswordCorrect => {
               if(!isPasswordCorrect)
               return res.status(400).json("Incorrect Email or Password")

               const dataPayload = {
                    _id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin
               }

               const encodedToken = jwt.sign(dataPayload, process.env.JWT_SECRET);
               res.json(encodedToken);
          })
          .catch(err => res.status(500).json(err.message));
     })
     .catch(() => res.sendStatus(500));
}





module.exports = {
     getAllUsers,
     registerUser,
     loginUser,
     getUserDetails
}