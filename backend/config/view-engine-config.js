const path = require('path');
var exphbs  = require('express-handlebars');

module.exports = (app) => {
  app.set('views', path.join(__dirname, '../routes/web/views'));
  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars')
}