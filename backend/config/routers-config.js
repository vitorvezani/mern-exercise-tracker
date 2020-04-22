module.exports = (app) => {
  // WEB
  app.use('/', require('../routes/web/webapp'))

  // API
  app.use('/api/exercises', require('../routes/api/exercises'))
  app.use('/api/users', require('../routes/api/users'))
}