var express = require('express');
var router = express.Router();
var loginSession = require('../helpers/util')

const nodemailer = require("nodemailer");

module.exports = function (pool) {


  /* GET home page. */
  router.get('/', function (req, res, next) {
    console.log("");
    console.log("");
    console.log("");
    console.log("==========================WORK ROUTER INDEX>>>>>>>>>>>>>>>>>>>");
    console.log("============================START ENGINE>>>>>>>>>>>>>>>>>>>>>>");
    console.log("");
    console.log("");
    console.log("");

    
    res.render('login', {
      title: 'Login',
      user: req.session.user,
      loginMessage: req.flash('loginMessage')
    })
  })

  router.get('/login', function (req, res, next) {
    console.log("");
    console.log("");
    console.log("");
    console.log("==========================WORK ROUTER INDEX>>>>>>>>>>>>>>>>>>>");
    console.log("===================================LOGIN>>>>>>>>>>>>>>>>>>>>>>");
    console.log("");
    console.log("");
    console.log("");
    
    res.render('login', { title: 'Login', user: req.session.user, loginMessage: req.flash('loginMessage') })
  })

  router.post('/login', function (req, res, next) {

      console.log("==================WORK ROUTER INDEX>>>>>>>>>>>>>>");
      console.log("=================POST LOGIN SESSION>>>>>>>>>>>>>>");
      console.log("");
      console.log("");
      console.log("");

    pool.query('SELECT * FROM users WHERE email=$1 AND password=$2', [req.body.email, req.body.password], (err, response) => {
      console.log(response.rows.length);

      if (response.rows.length > 0) {
        req.session.user = response.rows[0]
        res.redirect('/projects')
      } else {
        req.flash('loginMessage', 'User Email or Password is Wrong')
        res.redirect('login')
      }
    })
  });

  router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
      // cannot access session here
      res.redirect('/login')
    })
  })

  router.get('/forgotpassword', function (req, res, next) {
    
    console.log("WORK ROUTER INDEX");
    console.log("=======================/FORGOTPASSWORD=============================");
      console.log("");
      console.log("");
      console.log("");
    
    res.render('forgotpassword', { title: 'Forgot Password', forgotMessage: req.flash('forgotMessage'), successMessage: req.flash('successMessage') })

  });

  router.post('/send', function (req,res) {

    console.log("WORK ROUTER INDEX");
    console.log("=======================SEND FORGOTPASSWORS=============================");
      console.log("");
      console.log("");
      console.log("");
    
    let filterLogin = false

    pool.query(`SELECT email FROM users WHERE email = '${req.body.emailAccount}'`, (err, call) => {
      console.log(call.rows[0]);

      let updatePass = ``

      if (call.rows[0] == undefined){
        req.flash('forgotMessage', 'Email Account Not Found')
        res.redirect('forgotpassword')
      }else if(call.rows[0]){
        filterLogin = true
        updatePassword = `UPDATE users SET password = floor(random () * 99999) WHERE email = '${req.body.emailAccount}'`
        req.flash('successMessage', 'Request Has Been Sent__ Transporter Cant Connect!!')
        res.redirect('forgotpassword')
      }
    })
  })


  router.get('/', function (req, res, next) {

    console.log("WORK ROUTER INDEX");
    console.log("=======================PROFILE=============================");

    res.redirect('/profile');

  });



  router.get('/tes', (req,res) => {
    
    res.render('tesBody')


  })

  // router.get('/', function (req, res, next) {
  //   res.redirect('/profile');
  //   console.log("WORK ROUTER INDEX");
  //   console.log("=======================PROFILE=============================");

  // });

  // router.post('/login', function (req, res, next) {
  //   pool.query('SELECT * FROM users WHERE email=$1 AND password=$2', [req.body.email, req.body.password], (err, response) => {
  //     if (response.rows.length > 0) {
  //       req.session.user = response.rows[0]
  //       res.redirect('/projects/list')
  //     } else {
  //       req.flash('loginMessage', 'User Email or Password is Wrong')
  //       res.redirect('login')
  //     }
  //   })
  // })

  return router;
}