'use strict'

const database = require('../config/database-config');
const User = require('../models/user/user')
const bcrypt = require('bcrypt')

module.exports.up = async () => {
  await database()
  const hashedPassword = await bcrypt.hash('adminpassword', 10)
  await new User({name: 'admin', username: 'admin', email: 'admin@admin.com', password: hashedPassword}).save()
}

module.exports.down = (next) => {
  next()
}
