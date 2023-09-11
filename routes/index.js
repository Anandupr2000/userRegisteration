var express = require('express');
const { registerUser } = require('../db/helper');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.regSuccess){
    console.log("registration success")
    console.log(req.session)
    req.session.regSuccess = false
    res.render('index', { showAlert: true, msg: req.session.regMessage });
  }
  else if (req.session.regFailed){
    console.log("registration failed")
    console.log(req.session)
    req.session.regFailed = false
    res.render('index', { showAlert: true, msg: req.session.regMessage });
  }
  else
    res.render('index', { title: 'User Registration' });
});

router.post('/submit', (req, res) => {
  console.log("submition request received")
  // console.log(req.body)
  // console.log(req.body['fname'])
  registerUser(req.body)
    .then((response) => {
      // console.log("registeration message : ")
      // console.log(response)
      if (response['success']) {
        req.session.regSuccess = true
        req.session.regMessage = "User successfully registered"
        res.redirect("/")
      }
      else {
        console.log("registeration failed")
        req.session.regFailed = true
        req.session.regMessage = response['msg']
        res.redirect("/")
      }
      return res
    })
    .catch(err => {
      console.log(err)
    })
  // console.log('Message:')
  // console.log(response['msg'])
  // res.render('index', { showAlert: true, status: response['success'], msg: response['msg'] });
  // res.redirect('/')

})
module.exports = router;
