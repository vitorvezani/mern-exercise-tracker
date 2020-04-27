const router = require('express').Router();
const User = require('../../models/user/user');
const { registerValidation } = require('../../models/user/user_validation')
const bcrypt = require('bcrypt')

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({error: err}));
});

router.route('/').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json(newUser))
    .catch(err => res.status(400).json({error: err}));
});

router.route('/register').post(async (req, res) => {
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