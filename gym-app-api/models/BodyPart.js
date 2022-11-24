const mongoose = require('mongoose');

const bodyPartSchema = new mongoose.Schema({
    name:String
})

module.exports = mongoose.model("bodypart",bodyPartSchema);
