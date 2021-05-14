var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
const {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware');
var db = require("../config/database");

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', {title: "Not Instagram"});
});

router.get('/login', (req, res, next) => {
  res.render("login", {title: "Log In"});
});

router.get('/registration', (req, res, next) => {
  res.render("registration", {title: "Register"});
});

router.use('/postimage', isLoggedIn);

router.get('/postImage', (req, res, next) => {
  res.render("postImage", {title: "Post"});
});

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
  res.render('imagepost', { title: `Post ${req.params.id}`});
});



module.exports = router;
