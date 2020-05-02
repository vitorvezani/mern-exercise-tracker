const router = require('express').Router()
const User = require('../../models/user/user')
const jwt = require('express-jwt')

router.route('/').get(jwt({ secret: process.env.JWT_TOKEN_SECRET }), (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json({ error: err }))
});

module.exports = router;