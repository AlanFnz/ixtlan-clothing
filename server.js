// const cors = require("cors");
// const express = require("express");
// const stripe = require("stripe")("pk_test_51HG2OoBHCiBqaYbdipS57WSrO4VzMQr3QLcPeZ3DxQfHcPD7fWCuaUP4ei9TV4gmTnIe0nsesZ9UbciDrG9vKyYF00FJdBPUEp");

// const app = express();

// //Middleware
// app.use(express.json());
// app.use(cors());

// //Route
// app.get("/", (req, res) => {
//   res.send("It works");
// });

// app.post("/payment", (req, res) => {
//   const { token, amount, currency } = req.body;
//   console.log('amount', amount);

//   return stripe.charges.create(body, (stripeErr, stripeRes) => {
//     if (stripeErr) {
//       res.status(500).send({ error: stripeErr });
//     } else {
//       res.status(200).send({ success: stripeRes });
//     }
//   });


// });

// //Listen
// app.listen(5000, () => console.log('Listening at port 5000'));

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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