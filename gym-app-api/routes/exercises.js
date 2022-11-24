const express = require("express");
const BodyPart = require("../models/BodyPart");
const Exercise = require("../models/Exercise");

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.query.bodypart)
    return res.send(await Exercise.find({ bodyPart: req.query.bodypart }));
  if (req.query.q) return res.send(await Exercise.find({ name: req.query.q }));
  return res.send(await Exercise.find());
});

router.get("/bodyParts", async (req, res) => {
  const bodyParts = await BodyPart.find();
  res.send(bodyParts);
});

router.get("/:id", async (req, res) => {
  const exercise = await Exercise.find({ id: req.params.id });
  res.send(exercise);
});

module.exports = router;
