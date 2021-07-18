const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
// const { forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.post('/register', (req, res) => {
  const { name, email, password, password2, checkbox } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
      checkbox
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
          checkbox
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          checkbox
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

// Dashboardu
router.get('/dashboard', ensureAuthenticated, (req, res) =>
{
  console.log(req.user)
  if (req.user.checkbox === 1) {
    res.render('studentdashboard', {
    user: req.user
    })
  }
  else {
  res.render('teacherdashboard', {
    user: req.user
  })
  }
  
});

module.exports = router;
