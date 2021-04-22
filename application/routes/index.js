var express = require('express');
var router = express.Router();

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

router.get('/postimage', (req, res, next) => {
  res.render("postimage", {title: "Not Instagram"});
});

router.get('/Imagepost', (req, res, next) => {
  res.render("Imagepost", {title: "Not Instagram"});
});

router.get('/home', (req, res, next) => {
  res.render("home", {title: "Not Instagram"});
});

module.exports = router;
