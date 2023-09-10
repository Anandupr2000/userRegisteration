var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'User Registration' });
});
router.post('/submit',(req,res)=>{
  console.log("submition request received")
  console.log(req.body)
  console.log(req.body['fname'])
  res.render("index",{ title: 'User Registration' })
})
module.exports = router;
