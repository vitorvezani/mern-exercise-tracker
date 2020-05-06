const router = require('express').Router()
const User = require('../../models/user/user')
const { registerValidation, loginValidation } = require('../../models/user/user_validation')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

router.route('/login').post(async (req, res) => {
  const errors = loginValidation(req.body)
  if (errors) return res.status(400).json({ error: errors })

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email: email }).exec()
    if (user == null) {
      return res.status(400).json({ error: 'Password or email incorrect' })
    }
    if (await bcrypt.compare(password, user.password)) {
      jsonwebtoken.sign({user}, process.env.JWT_TOKEN_SECRET, function (err, token) {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        res.set('Authorization', `Bearer ${token}`)
        return res.json(user)
      })
    } else {
      return res.status(400).json({ error: 'Password or email incorrect' })
    }
  } catch (err) {
    console.error(err)
    return res.status(400).json({ error: 'Password or email incorrect' })
  }
});

router.route('/register').post(async (req, res, next) => {
  try {
    const errors = registerValidation(req.body)
    if (errors) return res.status(400).json({ error: errors })

    const { name, password, username, email } = req.body
    const hashedPw = await bcrypt.hash(password, 10)
    const user = await new User({ name, username, email, password: hashedPw }).save()
    return res.json(user)
  } catch (err) {
    return next(err)
  }
});

module.exports = router