const mongoose = require('mongoose')
const dotenv = require('dotenv').config()





const paintingSchema = new mongoose.Schema({
    name: String,
    link: String,
    responses: [String]
  });

  

const Painting = mongoose.model('Painting', paintingSchema)

module.exports = Painting