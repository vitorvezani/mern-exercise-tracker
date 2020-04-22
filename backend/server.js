require('dotenv').config()

const express = require('express')
const cors = require('cors')

const path = require('path');

const app = express()

require('./config/database-config')();
require('./config/passport-config')(app);

const port = process.env.PORT || 5000

app.set('views', path.join(__dirname, '/routes/web/views'));
app.set('view-engine', 'ejs')

app.use(express.urlencoded({ extended: false}))
app.use(cors())
app.use(express.json())

// WEB
app.use('/', require('./routes/web/webapp'))

// API
app.use('/api/exercises', require('./routes/api/exercises'))
app.use('/api/users', require('./routes/api/users'))

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});
