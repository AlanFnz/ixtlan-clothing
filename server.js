const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require('nodemailer-sendgrid');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_KEY);

const app = express();
const port = process.env.PORT || 5000;

// const transport = {
//   host: process.env.REACT_APP_EMAIL_HOST,
//   port: process.env.REACT_APP_EMAIL_PORT,
//   auth: {
//     user: process.env.REACT_APP_EMAIL_USERNAME,
//     pass: process.env.REACT_APP_EMAIL_PASSWORD,
//   },
// };

// const transport = {
//   service: 'SendGrid',
//   auth: {
//     api_key: process.env.REACT_APP_SENDGRID_APIKEY,
//   },
// };

// console.log('transport:', transport);

// const transporter = nodemailer.createTransport(transport);

const transporter = nodemailer.createTransport(
  nodemailerSendgrid({
      apiKey: process.env.REACT_APP_SENDGRID_API_KEY
  })
);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Transporter ok");
  }
});

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(enforce.HTTPS({ trustProtoHeader: true}));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

app.post('/message', (req, res, next) => {
  const from = req.body.email;
  const message = `Message from Ixtlan Clothing by ${from}: ${req.body.message}`;
  console.log('req.body', req.body);
  console.log('transporter', transporter);
  var mail = {
    from: from,
    to: 'alan.f@msn.com',  
    subject: 'Contact form Ixtlan Clothing',

    html: message
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log('error', err);
      res.json({
        msg: 'fail'
      })
    } else {
      console.log('success');
      res.json({
        msg: 'success'
      })
    }
  })
})

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});