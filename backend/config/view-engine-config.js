const path = require('path');

module.exports = (app) => {
  app.set('views', path.join(__dirname, '/routes/web/views'));
  app.set('view-engine', 'ejs')
}