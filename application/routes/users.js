var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { check, validationResult } = require('express-validator');
const UserModel = require('../models/Users');
const UserError = require('../helpers/error/UserError');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var bcrypt = require('bcrypt');

router.post("/registration", 
  [
    check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email - please enable Javascript'), 
  check('password')
    .isLength({min: 8})
    .withMessage('Password must have at least 8 characters - please enable Javascript')
    .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[-!@#$^&*+/])/, "i")
    .withMessage('Password does not contain at least 1 uppercase letter, 1 number, and one special character -!@#$^&*+/ - please enable Javascript'), 
  check('username')
    .isLength({min: 3})
    .withMessage('Username must have at least 3 characters - please enable Javascript')
    .matches(/^[a-zA-Z][a-zA-Z0-9]/, "i")
    .withMessage('Username may only contain alphanumerical characters - please enable Javascript'),
  ], 
  function(req, res, next) {

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
  
    const errorsX = validationResult(req);
    if(!errorsX.isEmpty() || password !== cpassword){
      return res.status(400).json({ errorsX: errorsX.array() })
    }
      UserModel.usernameExists(username)
      .then((usernameDoesExist) => {
        if (usernameDoesExist){
          throw new UserError(
            "Registration Failed: Username already exists",
            "/regstration",
            200
          );
        }
        else{
          return UserModel.emailExists(email);
        }
      })
      .then((emailDoesExist) => {
        if (emailDoesExist){
          throw new UserError(
            "Registration Failed: Email already exists",
            "/regstration",
            200
          );
        }
        else{
          return UserModel.create(username, password, email);
        }
      })
      .then((createdUserId) => {
        if (createdUserId < 0){
          throw new UserError(
            "Server Error: User could not be created",
            "/registration",
            500
          );
        }
        else{
          successPrint("User.js ---> User was created!");
          req.flash('success', 'User account has been made!');
          res.redirect("/login");
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
      })
  });


router.post("/login", 
[
  check('username')
    .isLength({min: 3})
    .withMessage('Username must have at least 3 characters - please enable Javascript')
    .matches(/^[a-zA-Z][a-zA-Z0-9]/, "i"),
  check('password')
    .isLength({min: 8})
    .withMessage('Password must have at least 8 characters - please enable Javascript')
    .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[-!@#$^&*+/])/, "i")
],
function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  const errorsX = validationResult(req);

  if(!errorsX.isEmpty()){
    throw new UserError("Invalid username and/or password", "/login", 200);
  }

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
  UserModel.authenticate(username, password)
  .then((loggedUserId) => {
    if(loggedUserId){
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
