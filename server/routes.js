

module.exports = function router(app) {

  
  app.get('/', function(req, res) {
    res.sendFile(`${publicPath}/index.html`);
  });

  app.get('/gallery', function(req, res) {
    res.sendFile(`${publicPath}/pages/gallery.html`);
  });

  app.get('/api/ticket_submit?', function(req, res) {

    console.log('got the route');
    res.sendFile(`${publicPath}/index.html`);

  });


};