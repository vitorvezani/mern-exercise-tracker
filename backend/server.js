const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
require('dotenv').config({ path: envFile })

const express = require('express')
const cors = require('cors')
const app = express()

require('./config/database-config')();
require('./config/passport-config')(app);
require('./config/view-engine-config')(app);

const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())

require('./config/routers-config')(app);

app.use(function (err, req, res, next) {
  if (err) {
    console.error(err.name)
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status).json({ code: err.code, error: err.message });
  }
  next()
});

const appServer = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});

module.exports = appServer