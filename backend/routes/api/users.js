const router = require('express').Router();
const User = require('../../models/user/user');
const { registerValidation, loginValidation } = require('../../models/user/user_validation')
const bcrypt = require('bcrypt')

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({error: err}))
});

router.route('/login').post(async (req, res) => {
  const errors = loginValidation(req.body)
  if(errors) return res.status(400).json({error: errors})

  const {email, password } = req.body

  try {
    const user = await User.findOne({ email: email }).exec()
    if (user == null) return res.status(400).json({error: 'Password or email incorrect'})
    if (await bcrypt.compare(password, user.password)) {
      return res.json(user)
    } else {
      return res.status(400).json({error: 'Password or email incorrect'})
    }
  } catch (err) {
    return res.status(400).json({error: 'Password or email incorrect'})
  }
});

router.route('/').post(async (req, res) => {
  try {
    const errors = registerValidation(req.body)
    if (errors) return res.status(400).json({error: errors})

    const { name, password, username, email } = req.body
    const hashedPw = await bcrypt.hash(password, 10)
    const user = await new User({ name, username, email, password: hashedPw }).save()
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(400).json({error: err})
  }
});

module.exports = router;