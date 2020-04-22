const mongoose = require('mongoose')

module.exports = () => {
  const uri = process.env.ATLAS_URI
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
  const connection = mongoose.connection
  connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
  })
}