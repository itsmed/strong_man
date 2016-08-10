

module.exports = function router(app, path) {
  const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        userSchema = new Schema({ 'email': String} ),
        Admin = mongoose.model('Admin_user', userSchema);
        

  app.get('/', function(req, res) {
    console.log('getting root');
    res.sendFile(`${path}/index.html`);
  });

  app.get('/gallery', function(req, res) {
    res.sendFile(`${path}/pages/gallery.html`);
  });

  app.get('/api/ticket_submit?', function(req, res) {

    console.log('got the route');
    res.sendFile(`${path}/index.html`);

  });

  app.get('/api/admins', function(req, res, next) {
    
    
    Admin.count(function(err, totalAdmins) {

      if (err) {
        console.warn('ERROR QUERYING DB', err);
      }
      console.log('ADIM', totalAdmins);
      res.send({'totalAdmins': totalAdmins});
      next();
    });
    
  });

};