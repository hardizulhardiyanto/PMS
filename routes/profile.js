var express = require('express');
var router = express.Router();
var loginSession = require('../helpers/util')
nav = 2

module.exports = (pool) => {

  router.get('/', loginSession.isLoggedIn, function (req, res, next) {
    nav = 2
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROFILE");
    console.log("=======================PROFILE=============================");
    console.log("");
    console.log("");
    console.log("");


    let dataSession = req.session.user.userid
    let dbUser = `SELECT * FROM users WHERE userid = '${dataSession}'`;

    console.log(dbUser);
    
    pool.query(dbUser, (err, dataDB) => {

      console.log(dataDB.rows);
      
      res.render('profile/profile',{
        dbDATA : dataDB.rows, nav
      });
    })
  });

  router.post('/update', loginSession.isLoggedIn, function (req,res,next) {
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROFILE");
    console.log("=======================UPDATE PROFILE=============================");
    console.log("");
    console.log("");
    console.log("");

    let dtParams = req.session.user.userid
    let {password, position, working_status} = req.body

    let updateDB = 'UPDATE users SET '

    if (password.length > 0) {
      let dbPassNotNull = `UPDATE users SET password = '${password}', roles = '${position}', work_status = '${working_status}'  WHERE userid = '${dtParams}';`
      pool.query(dbPassNotNull, (err, processDBtrue) => {
        // res.redirect('/projects')
      })

      console.log(`dbNotNull> ${dbPassNotNull}`);
      console.log("");
      console.log("");
      console.log("PROCESSED");
      
    }else{

      let dbPassNull = `UPDATE users SET roles = '${position}', work_status = '${working_status}' WHERE userid = '${dtParams}';`

      pool.query(dbPassNull, (err, processDBfalse) => {
        res.redirect('/projects')
      })
      console.log(`dbNull> ${dbPassNull}`);
      console.log("");
      console.log("");
      console.log("PROCESSED");
      
    }

    console.log(req.body);
    console.log(password.length);
    
  })


 return router;

}
