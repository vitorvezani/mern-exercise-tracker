const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const passport = require('passport');
const User = require('../models/user/user')
const flash = require('express-flash');
const session = require('express-session');

module.exports = (app) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  
  passport.serializeUser((user, done) => {
    done(null, user.id)
   })

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id })
      .then(user => {
        done(null, user)
      })
      .catch(err => done(err))
  })

  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }))

  app.use(passport.initialize())
  app.use(passport.session())

}

const authenticateUser = async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email }).exec()
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