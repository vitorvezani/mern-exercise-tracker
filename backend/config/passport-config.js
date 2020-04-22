const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const passport = require('passport');
const User = require('../models/user.model')
const flash = require('express-flash');
const session = require('express-session');

function initialize(app) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => { done(null, user.id) })
  passport.deserializeUser((id, done) => {
    User.find({ _id: id })
      .then(user => done(null, user))
      .catch(err => done(err))
  })

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }))

}

const authenticateUser = async (email, password, done) => {
  try {
    const users = await User.find({ email: email }).exec()
    const user = users[0]
    if (user == null) return done(null, false, { message: 'Password or email incorrect' })
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user)
    } else {
      return done(null, false, { message: 'Password or email incorrect' })
    }
  } catch (err) {
    return done(err)
  }
}

module.exports = initialize