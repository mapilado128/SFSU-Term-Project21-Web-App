var express = require('express');
var router = express.Router();
var db = require('../config/database');
const UserError = require('../helpers/error/UserError');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var bcrypt = require('bcrypt');

router.post("/register", function(req, res, next) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.cpassword;

  //do server side validation
  //must do on my own - not on video

  db.execute("SELECT * FROM users WHERE username=?", [username])
  .then(([results, fields]) => {
    if(results && results.length == 0){
      return db.execute("SELECT * FROM users WHERE email=?", [email]);
    }
    else{
      throw new UserError(
        "Registration Failed: Username already exists",
        "/regstration",
        200
      );
    }
  })
  .then(([results, fields]) => {
    if(results && results.length == 0){
      return bcrypt.hash(password, 15);
    }
    else{
      throw new UserError(
        "Registration Failed: Email already exists",
        "/regstration",
        200
      );
    }
  })
  .then((hashedPassword) => {
    let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?,?,?,now());"
    return db.execute(baseSQL, [username, email, hashedPassword])
    
  })
  .then(([results, fields]) => {
    if(results && results.affectedRows){
      successPrint("User.js ---> User was created!");
      req.flash('success', 'User account has been made!');
      res.redirect("/login");
    }
    else{
      throw new UserError(
        "Server Error: User could not be created",
        "/registration",
        500
      );
    }
  })
  .catch((err) => {
    errorPrint("User could not be made", err);
    if(err instanceof UserError){
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect(err.getRedirectURL());
    }
    else{
      next(err);
    }
  });
});


router.post("/login", function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  //dovalidation server side validation

  let baseSQL = "SELECT id, username, password FROM users WHERE username=?;"
  let userId;
  db.execute(baseSQL, [username])
  .then(([results, fields]) => {
    if(results && results.length == 1){
      let hashedPassword = results[0].password;
      userId = results[0].id;
      return bcrypt.compare(password, hashedPassword);
    }
    else{
      throw new UserError("Invalid username and/or password", "/login", 200);
    }
  })
  .then((passwordsMatched) => {
    if(passwordsMatched){
      successPrint(`User ${username} is logged in`);
      req.session.username = username;
      req.session.userId = userId;
      res.locals.logged = true;
      req.flash('success', 'You have been successfully logged in!');
      res.redirect("/");
    }
    else{
      throw new UserError("Invalid username and/or password", "/login", 200);
    }
  })
  .catch((err) => {
    errorPrint("User login failed");
    if(err instanceof UserError){
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect("/login");
    }
    else{
      next(err);
    }
  })
});


router.post("/logout",(req, res, next) => {
  req.session.destroy((err) => {
    if(err){
      errorPrint("Session could not be destroyed");
      next(err);
    }
    else{
      successPrint("Session has been destroyed");
      res.clearCookie('MAcsid');
      res.json({status: "OK", message: "User is logged out"})
    }
  })
});
module.exports = router;
