var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: "Not Instagram"});
});

router.get('/login', (req, res, next) => {
  res.render("login", {title: "Not Instagram"});
});

router.get('/registration', (req, res, next) => {
  res.render("registration", {title: "Not Instagram"});
});

router.use('/postimage', isLoggedIn);

router.get('/postimage', (req, res, next) => {
  res.render("postimage", {title: "Not Instagram"});
});

module.exports = router;
