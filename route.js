var nodemailer = require('nodemailer');

var route = function(app) {

  app.post('/check', function(req,res) {

    var transporter = nodemailer.createTransport({
      host: req.body.host,
      secure: req.body.secure,
      port: req.body.port,
      auth: {
          user: req.body.username,
          pass: req.body.password,
      },
    });

    transporter.verify()
      .then(function() {
        res.sendStatus(201);
      })
      .catch(function(ex) {
        res.json(ex);
      });
  });

  app.post('/sendMail', function(req, res) {
    var transporter = nodemailer.createTransport({
      host: req.body.host,
      secure: req.body.secure,
      port: req.body.port,
      auth: {
          user: req.body.username,
          pass: req.body.password,
      },
    });

    var mailOptions = {
      from: req.body.from_email, // sender address
      to: req.body.to_email , // list of receivers
      subject: 'SMTP Verification', // Subject line
      html: '<b style="text-transform: capitalize;">Hello ,</b><br>\
      <p>Congratulations! Your SMTP credentials worked fine.</p>\
      <p>Host: '+req.body.host+'</p>',
    };

    transporter.sendMail(mailOptions)
      .then(function() {
        // Success
        res.sendStatus(201);
      })
      .catch(function(ex) {
        // Error
        res.json(ex);
      });
  });
}

module.exports = route;
