const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const _ = require('lodash');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    isAdmin:{
      type:Boolean,
      default:false
    },
    favIds:[String]

  });

  userSchema.methods.generateUserJwt= function () {
      return jwt.sign(_.pick(this,['_id','username','isAdmin']),
        process.env.LOGIN_SECRET_TOKEN
      );
    },



module.exports = mongoose.model(
  "user",
  userSchema
);
