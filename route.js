var nodemailer = require('nodemailer');
var Promise = require("bluebird");

// create reusable transporter object using the default SMTP transport

var route = function(app) {

  app.post('/check', function(req,res) {

    var promises = [];

    var transporter = nodemailer.createTransport({
      host: req.body.host,
      secure: req.body.secure,
      port: req.body.port,
      auth: {
          user: req.body.username,
          pass: req.body.password
      }
    });

    Promise.promisifyAll(transporter);

    var mailOptions = {
      from: req.body.from_email, // sender address
      to: req.body.to_email , // list of receivers
      subject: 'SMTP Checker', // Subject line
      html: '<b style="text-transform: capitalize;">Hello ,</b><br>\
      <p>UserName: '+req.body.username+'</p>\
      <p>Password: '+req.body.password+'</p>\
      <p>Host: '+req.body.host+'</p>\
      <p>PORT: '+req.body.port+'</p>\
      <p>Secure Flag: '+req.body.secure+'</p>' // html body
    };

    promises.push(transporter.sendMailAsync(mailOptions));

    Promise.all(promises)
    .then(function() {
      // Success
      res.sendStatus(201);
    })
    .catch(function(ex) {
      // Error
      res.json(ex);
    });
  })
}

module.exports = route;

              