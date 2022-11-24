const express = require("express");
const router = express.Router();
const _ = require("lodash");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const asyncMiddleware = require('../middleware/asyncMiddleware');

router.post("", asyncMiddleware(async (req, res) => {
  let user = _.pick(req.body, ["email", "password"]);
  const { error } = validation(user);
  if (error) return res.status(400).send(error.details[0].message);
  const exist = await User.findOne({ email: user.email });
  if (!exist) return res.status(400).send("email or password is wrong");

  if (!(await bcrypt.compare(user.password, exist.password)))
    return res.status(400).send("email or password is wrong");

  const jwtToken = exist.generateUserJwt();
  console.log(jwtToken)
  res.header("x-auth-token", jwtToken).send({..._.pick(exist, ['username','_id','favIds']),jwt:jwtToken});
}));

function validation(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).email().required(),
    password: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(user);
}

module.exports = router;
