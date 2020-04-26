const mongoose = require('mongoose')

module.exports = () => {
  const URI = process.env.ATLAS_URI
  mongoose.connect(URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log("MongoDB database connection established successfully"))
}