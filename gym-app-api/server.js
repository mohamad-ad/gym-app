const express = require("express");
const mongoose = require("mongoose");
const Exercise = require("./models/Exercise");
const BodyPart = require("./models/BodyPart");
const User = require("./models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require('cors')
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost/gym-app-db", () =>
  console.log("conected....")
);

app.post("/users/signup", async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(2).required(),
    password: Joi.string().min(2).required(),
    email: Joi.string().min(2).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try{
      const exist = await User.findOne({ username: req.body.username });
      console.log(exist)
      if (exist) return res.status(400).send("username is not available");
  }catch(err){
    console.log(err);
    res.status(500).send(err)
  }

  const jwtbody = { username: req.body.username };
  jwtToken = jwt.sign(jwtbody, process.env.LOGIN_SECRET_TOKEN);

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { ...req.body, password: hashedPassword };
    await User.create(user);
    const response = { username:user.username,email:user.email, jwt: jwtToken };
    res.send(response);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/users/login", async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  console.log(req.body.password);
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(401).send("username is wrong");
  console.log(user);
  const jwtbody = { username: user.username };
  const jwtToken = jwt.sign(jwtbody, process.env.LOGIN_SECRET_TOKEN);
  try {
    if (await bcrypt.compare(req.body.password, user.password))
      return res.send({ username: user.username, email:user.email, jwt: jwtToken });
    res.status(401).send("password is wrong");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/users/favorites", authoriazation, async (req, res) => {
  const favorites = await User.findOne({ username: req.body.username }).select({
    favExercises: 1,
    _id: 0,
  });
  res.send(favorites);
});

function authoriazation(req, res, next) {
  const headerToken = req.headers.authorization;
  const token = headerToken.split(" ")[1];
  if(!token) return res.sendStatus(401);
  console.log(token);
  jwt.verify(token, process.env.LOGIN_SECRET_TOKEN, (error, user) => {
    if (error) return res.sendStatus(401);
    console.log(user);
    req.body = user;
    next();
  });
}




app.listen(4000, () => console.log("listening on port 4000 ... "));
