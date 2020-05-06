const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
require('dotenv').config({ path: envFile })

const errorHandler = require('./utils/error_handler')

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

app.use(errorHandler);

const appServer = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});

module.exports = appServer