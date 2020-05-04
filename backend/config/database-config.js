require('dotenv').config()
const mongoose = require('mongoose')

module.exports = async () => {
  const URI = process.env.ATLAS_URI
  console.log(`Database configured with URI: ${URI}`)
  return await mongoose.connect(URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log('MongoDB database connection established successfully'))
}