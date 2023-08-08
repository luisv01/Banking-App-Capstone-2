const express = require('express');
const axios = require('axios');
const app = express();
var cors = require('cors');
var dal = require('./dal.js');

app.use(cors());
const port = 5000;

//home of backend
app.get('/', (req, res) => {
  res.send('Hello World from banking app backend in Docker!!!!');
});

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
  // check if account exists
  dal.find(req.params.email).then((users) => {
    // if user exists, return error message
    if (users.length > 0) {
      console.log('User already in exists');
      res.send('User already in exists');
    } else {
      // else create user
      dal
        .create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
          console.log(user);
          res.send(user);
        });
    }
  });
});

// login user
app.get('/account/login/:email/:password', function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      if (user[0].password === req.params.password) {
        res.send(user[0]);
      } else {
        res.send('Login failed: wrong password');
      }
    } else {
      res.send('Login failed: user not found');
    }
  });
});

// find user account
app.get('/account/find/:email', function (req, res) {
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {
  var amount = Number(req.params.amount);
  dal
    .find(req.params.email)
    .then((user) => {
      // console.log(`from update-find ${user[0].balance} and amount is: ${amount}`)
      if (user[0].balance + amount < 0) {
        res.send(console.log('Not enough funds from index.js'));
        return;
      }
      dal
        .update(req.params.email, amount)
        .then((response) => {
          console.log(response);
          res.send(response);
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => console.log(e));
});

// all accounts
app.get('/account/all', function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

app.listen(port, () => {
  console.log(`Banking app backend listening on port ${port} from Docker`);
});