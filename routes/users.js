var express = require('express');
var router = express.Router();
var loginSession = require('../helpers/util')
nav = 3
/* GET users listing. */
module.exports = (pool) => {


  /**Get LIST AREA */
  router.get('/', (req, res, next) => {
    nav = 3
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER USERS");
    console.log("=====================GET PROCESS USERS=============================");
    console.log("");
    console.log("");
    console.log("");
    const { ckUser1,
      idUser,
      ckUser2,
      nameUser,
      ckUser3,
      userPosition,
      ckUser4,
      userWorking } = req.query
    console.log('Request Query > ', req.query);

    let url = (req.url == `/`) ? `?page=1` : req.url

    let filter = []
    const page = req.query.page || 1
    console.log('data Page', page);

    const limit = 3
    const offset = (page - 1) * limit
    console.log(offset)

    if (ckUser1 && idUser) {
      checklist = true
      filter.push(`userid ='${idUser}' `)
    }
    if (ckUser2 && nameUser) {
      checklist = true
      filter.push(`firstname ='${nameUser}'`)
    }
    if (ckUser3 && userPosition) {
      checklist = true
      filter.push(`roles ='${userPosition}'`)
    }
    if (ckUser4 && userWorking) {
      checklist = true
      filter.push(`work_status ='${userWorking}'`)
    }

    let userCount = `SELECT COUNT (id) AS total FROM (SELECT userid as id FROM users`
    if (filter.length > 0) {
      userCount += ` WHERE ${filter.join(" AND ")}`
    }
    userCount += `) AS project_user`
    console.log('database SQL 1 >', userCount);


    pool.query(userCount, (err, count) => {
      const total = count.rows[0].total
      console.log('This Total Column > ', count.rows[0].total);
      console.log("");
      console.log("");
      console.log("");

      const pages = Math.ceil(total / limit)

      userCount = `SELECT * FROM users`
      if (filter.length > 0) {
        userCount += ` WHERE ${filter.join(" AND ")}`
      }
      userCount += ` ORDER BY userid DESC LIMIT ${limit} OFFSET ${offset}`

      console.log("============database SQL 2============ ");
      console.log(userCount);
      console.log("");
      console.log("");
      console.log("");

      pool.query(userCount, (err, callUsers) => {

        res.render('projects/users/list', {
          data: callUsers.rows, nav,
          query: req.query,
          user: req.session.user,
          pagination: { page, pages, total, url },
          successEditUser: req.flash('successEditUser'),
          successDelete: req.flash('SuccessDelete'),
          failedDelete: req.flash('failedDelete'),
          addDataSuccess: req.flash('addDataSuccess')


        })

      })
    })
  });

  router.get('/edit/:userid', (req, res) => {
    nav = 3
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER USERS");
    console.log("=====================GET EDIT USERS=============================");
    console.log("");
    console.log("");
    console.log("");

    let dtParams = req.params.userid

    let sqlData = `SELECT * FROM users WHERE userid='${dtParams}'`
    console.log(sqlData);

    pool.query(sqlData, (err, resUser) => {

      console.log(resUser.rows[0]);
      console.log(resUser.rows[0].admin);
      

      res.render('projects/users/edit', {
        data: resUser.rows[0],
        user: req.session.user

      })

    })

  })

  router.post('/edit/:userid', (req, res) => {
    nav = 3
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER USERS");
    console.log("===================== POST EDIT USERS =============================");
    console.log("");
    console.log("");
    console.log("");
    let dtParams = req.params.userid
    console.log(dtParams);

    console.log(req.body);

    const {
      editFirstname,
      editLastname,
      editEmail,
      editPass,
      editPosition,
      editStatus,
      userStatus
    } = req.body

    let sqlUpdate = ` UPDATE users SET  email='${editEmail}', 
    firstname='${editFirstname}', 
    lastname='${editLastname}', 
    roles='${editPosition}', 
    password='${editPass}',  
    work_status='${editStatus}',
    admin='${userStatus}'
    WHERE userid = '${dtParams}';`
    console.log(sqlUpdate);


    pool.query(sqlUpdate, (err, dtrespon) => {

      req.flash('successEditUser', 'Edit Data Success!!')
      res.redirect('/users')

    })

  })

  router.get('/delete/:userid', (req, res) => {
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER USERS");
    console.log("===================== POST DELETE USERS =============================");
    console.log("");
    console.log("");
    console.log("");

    let dtParams = req.params.userid
    console.log(req.params.userid);


    let sqlDelete = `DELETE FROM users WHERE userid= '${dtParams}'`
    console.log(sqlDelete);


    pool.query(sqlDelete, (err, dtDelete) => {

      if (err) {
        req.flash('failedDelete', `Delete Failed!! users id "${dtParams}" is still referenced from table "members`)
        res.redirect('/users')

      } else {

        req.flash('SuccessDelete', 'Delete Data Users Success!!!')
        res.redirect('/users')

      }

    })

  })

  /**Get Add User*/
  router.get('/addUser', (req, res) => {
    nav = 3
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER USERS");
    console.log("===================== GET ADD USERS =============================");
    console.log("");
    console.log("");
    console.log("");




    res.render('projects/users/add',{
      user: req.session.user

    })
  })

  /**Post Add User */
  router.post('/postAddUser', (req, res) => {
    nav = 3
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER USERS");
    console.log("===================== POST ADD USERS =============================");
    console.log("");
    console.log("");
    console.log("");

    let dtOptionproject = `{"idcheckbox":"true","namecheckbox":"true","memberscheckbox":"true"}`;

    let dtOptionMember = `{"idckmembers":"true","nameckmembers":"true","postckmembers":"true"}`;

    let dtOptionList = `{"idckissue":"true","subjectckissue":"true","trackerckissue":"true","statusckissue":"true","priorityckissue":"true","descckissue":"true","stdateckissue":"true","duedateckissue":"true","estTimeckissue":"true","doneissue":"true","authorissue":"true","assigneeissue":"true"}`


    const {
      newFirstname,
      newLastname,
      newEmail,
      newPass,
      position,
      workingStatus,
      userStatus
    } = req.body
    console.log(req.body);




    let sqlAdd = `INSERT INTO public.users(
      email, firstname, lastname, roles, password, work_status, admin, optionproject, optionmember, optionlist)
      VALUES ('${newEmail}', '${newFirstname}', '${newLastname}', '${position}', '${newPass}', '${workingStatus}', '${userStatus}', '${dtOptionproject}', '${dtOptionMember}','${dtOptionList}'); `
    console.log(sqlAdd);

    pool.query(sqlAdd, (err, dtInsert) => {
      req.flash('addDataSuccess', 'Add Data Success!, Thnkyu')
      res.redirect('/users')
    })




  })

  return router;


}




