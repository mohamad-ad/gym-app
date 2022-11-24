const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    bodyPart:String,
    equipment:String,
    gifUrl:String,
    name:String,
    target:String,
    id:String
})

module.exports = mongoose.model("exercise", exerciseSchema);