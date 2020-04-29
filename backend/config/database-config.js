require('dotenv').config()
const mongoose = require('mongoose')

module.exports = async () => {
  const URI = process.env.ATLAS_URI
  return await mongoose.connect(URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log("MongoDB database connection established successfully"))
}