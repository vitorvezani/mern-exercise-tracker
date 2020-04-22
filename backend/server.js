require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

require('./config/database-config')();
require('./config/passport-config')(app);
require('./config/view-engine-config')(app);

const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: false}))
app.use(cors())
app.use(express.json())

require('./config/routers-config')(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});
