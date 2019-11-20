var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

const outlookTransporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'tsuna-9111@hotmail.com', // your email
      pass: 'rebornhorse1#' // your email password
    }
  });

let mailOptions = {
    from: 'tsuna-9111@hotmail.com',                // sender
    to: 'chanburi.tanakrid@gmail.com',                // list of receivers
    subject: 'Hello from sender',              // Mail subject
    html: "<b>Do you receive this mail?</b>"
};

router.post('/', function(req, res, next) {
    outlookTransporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          res.send('send email complete.');
          console.log(info);
      });
});

module.exports = router;