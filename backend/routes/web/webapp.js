const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../../models/user.model');

router.route('/').get((req, res) => {
  console.log(req.user)
  res.render('index.ejs', {name: req.user.name})
});

router.route('/login').get((req, res) => {
  res.render('login.ejs')
});

router.route('/login').post(passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.route('/register').get((req, res) => {
  res.render('register.ejs')
});

router.route('/register').post(async (req, res) => {
  try {
    const { name, password, username, email } = req.body
    const hashedPw = await bcrypt.hash(password, 10)

    await new User({ name, username, email, password: hashedPw }).save()
    res.redirect('/login')
  } catch (err) {
    console.error(err)
    res.redirect('/register')
  }
});

module.exports = router;