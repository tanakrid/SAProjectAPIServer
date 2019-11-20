var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/submit", {
      target: "http://localhost:4000",
      secure: false,
      changeOrigin: true
    })
  );
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next){
  res.render('index', {title: 'test'});
});



router.post('/submit', function(req, res, next) {
  // form email content
  var header = `<h1> รายการแจกแจงคำสั่งซื้อ </h1>`;
  var content = "";
  var footer = `<h3> ยอดรวมราคา : ${req.query.price} บาท </h3>
                <p> ลูกค้าสามารถโทรมายืนยันการสั่งงานหรือยกเลิกได้ที่เบอร์โทรศัพท์ 035-201-147 </p>`

  console.log("number of list:"+req.query.list.length)
  for (let index = 0; index < req.query.list.length; index++) {
    console.log("Item:"+req.query.list[index]);
    content = content + "<p>"+req.query.list[index]+"</p>";
  }

  console.log("result:"+content);

  const outlookTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'NongNoonPrintingHouse@gmail.com', // your email
      pass: 'SAProject31' // your email password
    }
  });
  let mailOptions = {
    from: 'NongNoonPrintingHouse@gmail.com',                // sender
    to: req.query.email,                // list of receivers
    subject: 'ใบเสนอราคา',              // Mail subject
    html: header+content+footer
  };
  outlookTransporter.sendMail(mailOptions, function (err, info) {
    console.log(req.query.email);
      if(err){
        res.send(err);
        console.log(err);
      }
      else
        res.send(info);
        console.log(info);
    });
});

module.exports = router;
