const bcrypt = require('bcryptjs');
const { request } = require('express');
const jsonWebToken = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');


module.exports.login = async function(request, response){
  const candidate = await User.findOne({email: request.body.email});
  if(candidate){
    //if passwords ident 
    const passwordResult = bcrypt.compareSync(request.body.password, candidate.password);
    if(passwordResult){
      //generate token
      const token = jsonWebToken.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jsonWebToken, {expiresIn: 60*60});
      response.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      response.status(401).json({message: 'password is invalid'});
    }
  } else {
    //error 
    response.status(404).json({message: 'user with this email not found'})
  }
};

module.exports.register = async function(request, response){
  //email password
  const candidate = await User.findOne({email: request.body.email});

  if(candidate){
    //user isset -> error
    response.status(409).json({
      message: 'Try enother email. This email is occuped!'
    })
  } else {
    //user is not found, we need to create it
    const salt = bcrypt.genSaltSync(10);
    const password = request.body.password;
   const user = new User({
     email: request.body.email,
     password: bcrypt.hashSync(password, salt)
   });

   try{
    await user.save();
    response.status(201).json(user);
   } catch(error){
     errorHandler(response, error);
   }
  }
};