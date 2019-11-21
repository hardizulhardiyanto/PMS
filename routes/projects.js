var express = require('express');
var router = express.Router();
var loginSession = require('../helpers/util')
var nav = 1
var path = require('path')

var moment = require('moment')

module.exports = function (pool) {



  /* GET home page. */
  router.get('/', loginSession.isLoggedIn, function (req, res, next) {
    console.log("");
    console.log("");
    console.log("");
    console.log("===============WORK ROUTER PROJECTS======================");
    console.log("=======================STARt=============================");

    //------------ filter

    const id_number = req.query.id_number;
    const project_name = req.query.project_name;
    const member = req.query.member;

    let url = (req.url == '/') ? '/?page=1' : req.url

    let ck1 = req.query.ck1, ck2 = req.query.ck2, ck3 = req.query.ck3

    let userAdmin = req.session.user.admin
    console.log('userAdmin > ', userAdmin);


    console.log("Vvvv_Req.query_vvvV");
    console.log(req.query);

    let filter = []


    const page = req.query.page || 1;
    const limit = 3;
    const offset = (page - 1) * limit
    console.log(offset);

    if (ck1 && id_number) {
      ceklist = true
      filter.push(`projects.projectid = ${id_number}`)
    }
    if (ck2 && project_name) {
      ceklist = true
      filter.push(`projects.name = '${project_name}'`)
    }
    if (ck3 && member) {
      ceklist = true
      filter.push(`members.userid = ${member}`)
    }

    console.log(`this filter> ${filter}`);
    console.log(`thisUrl> ${url}`);

    if (userAdmin == true) {
      // database 1 MENJUMLAHKAN DATA UNTUK PAGINATION
      sql = `SELECT COUNT (id) AS total FROM (SELECT projects.projectid AS id 
      FROM projects 
      LEFT JOIN members ON projects.projectid = members.projectid
      LEFT JOIN users ON users.userid = members.userid`
      if (filter.length > 0) {
        sql += ` WHERE ${filter.join(" AND ")}`
      }
      sql += `) AS project_member`
    } else {
      // database 1 MENJUMLAHKAN DATA UNTUK PAGINATION
      sql = `SELECT COUNT (id) AS total FROM (SELECT projects.projectid AS id 
      FROM projects 
      LEFT JOIN members ON projects.projectid = members.projectid
      LEFT JOIN users ON users.userid = members.userid
      WHERE users.userid=${req.session.user.userid}  `
      if (filter.length > 0) {
        sql += ` WHERE ${filter.join(" AND ")}`
      }
      sql += `) AS project_member`
    }

    pool.query(sql, (err, count) => {
      console.log("");
      console.log("");
      console.log("");
      console.log("============database SQL 1 MENJUMLAHKAN TOTAL PROJECT ID============ ");
      console.log(sql);
      console.log("");
      console.log("");
      console.log("");

      const total = count.rows[0].total
      console.log(`this Total Column table PROJECTS> ${total} `);
      console.log("");
      console.log("");
      console.log("");

      const pages = Math.ceil(total / limit)

      if (userAdmin == true) {
        console.log('admin session');
        // database 2 MENAMPILKAN DATA PROJECTS BERDASARKAN ADMIN SESSION
        sql = `SELECT * 
              FROM members
              INNER JOIN projects ON projects.projectid=members.projectid
              INNER JOIN users ON users.userid=members.userid`
        console.log("============database SQL ADMIN=========== ");
        console.log('show sql ADMIN > ', sql);

        if (filter.length > 0) {
          sql += ` WHERE ${filter.join(" AND ")}`
        }
        sql += ` ORDER BY projects.projectid DESC LIMIT ${limit} OFFSET ${offset}`

        console.log("============database SQL 2 MENAMPILKAN JUMLAH LIMIT PAGINATION============ ");
        console.log('show sql 2 > ', sql);
        console.log("");
        console.log("");
        console.log("");

      } else {
        console.log('user session');
        // database 2 MENAMPILKAN DATA PROJECTS BERDASARKAN USER SESSION
        sql = `SELECT * 
        FROM members
        INNER JOIN projects ON projects.projectid=members.projectid
        INNER JOIN users ON users.userid=members.userid
        WHERE users.userid= ${req.session.user.userid}`
        console.log("============database SQL USER============ ");
        console.log('show sql User > ', sql);


        if (filter.length > 0) {
          sql += ` WHERE ${filter.join(" AND ")}`
        }
        sql += ` ORDER BY projects.projectid DESC LIMIT ${limit} OFFSET ${offset}`

        console.log("============database SQL 2 MENAMPILKAN JUMLAH LIMIT PAGINATION============ ");
        console.log('show sql 2 > ', sql);
        console.log("");
        console.log("");
        console.log("");

      }



      let sqlUserColumn = `SELECT optionproject FROM users WHERE userid = ${req.session.user.userid}`;

      console.log(`ThisSQLUser > ${sqlUserColumn} `);

      pool.query(sqlUserColumn, (err, dataOptionProject) => {

        pool.query(sql, (err, call) => {

          let sqlAllmember = `SELECT DISTINCT (users.userid), users.firstname,lastname
          FROM members
          INNER JOIN projects ON projects.projectid=members.projectid
          INNER JOIN users ON users.userid=members.userid`

          pool.query(sqlAllmember, (err, allMember) => {

            res.render('projects/list', {
              data: call.rows, nav,
              pages, page, url,
              query: req.query,
              user: req.session.user,
              pagination: {
                page, pages, total, url,
              },
              query: req.query,
              optionproject: JSON.parse(dataOptionProject.rows[0].optionproject),
              dtAllMember: allMember.rows,
              addProjectSuccess: req.flash('addProjectSuccess'),
              editSuccess: req.flash('editSuccess'),
              deleteProject: req.flash('deleteProject'),
              editProfileSuccess: req.flash('editProfileSuccess')
            })
          })
        })
      })
      console.log("");
      console.log("");
      console.log("");
      console.log("=======================END OF ROUTER PROJECT=============================");
    })
  });

  /* POST PROJECTOPTIONS FOR CHECK OPTION */
  router.post('/projectoptions', loginSession.isLoggedIn, function (req, res) {

    console.log("");
    console.log("");
    console.log("");
    console.log("===============WORK ROUTER PROJECTS/PROJECTOPTION======================");
    console.log("=======================STARt=============================");
    console.log("");
    console.log("");
    console.log("");

    let sqlUpdateUsers = `UPDATE users SET optionproject = '${JSON.stringify(req.body)}' WHERE userid = ${req.session.user.userid}`

    console.log(`dataOptionProject> ${sqlUpdateUsers}`);
    pool.query(sqlUpdateUsers, (err, dataUpdate) => {

      console.log(dataUpdate.rows);
      res.redirect('/projects')
    })

  })

  /* GET ADD PROJECT */
  router.get('/add', loginSession.isLoggedIn, function (req, res, next) {
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=======================ADD=============================");
    console.log("");
    console.log("");
    console.log("");

    let sqlData = `SELECT userid, firstname, lastname, roles FROM users ORDER BY userid`

    console.log(sqlData);
    pool.query(sqlData, (err, responsData) => {
      console.log(responsData.rows);

      res.render('projects/add', {
        data: responsData.rows, nav,
        user: req.session.user,
        dataNull: req.flash('dataNull')

      });
    })

  });

  /* POST ADD PROJECT */
  router.post('/add', loginSession.isLoggedIn, function (req, res, next) {
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=======================POST ADD=============================");
    console.log("");
    console.log("");
    console.log("");

    const { addproject, membersck } = req.body;
    console.log(addproject);
    console.log(req.body);
    console.log(membersck);

    if (addproject && membersck) {
      ceklist = true

      const insertId = `INSERT INTO projects (name) VALUES ('${addproject}')`
      pool.query(insertId, (err, dbProjects) => {
        let selectidMax = `SELECT MAX (projectid) FROM projects`
        pool.query(selectidMax, (err, dataMax) => {
          console.log("Data Max VVVVV");
          let insertidMax = dataMax.rows[0].max
          console.log(insertidMax);
          let insertMember = 'INSERT INTO members (userid, roleid, projectid) VALUES '
          if (typeof membersck == 'string') {
            insertMember += `(${membersck}, ${insertidMax});`
          } else {

            let members = membersck.map(item => {
              return `(${item}, ${insertidMax})`
            }).join(',')

            insertMember += `${members};`
          }

          console.log(insertMember);
          pool.query(insertMember, (err, dataSelect) => {
            // const lastID = dataSelect.rows
            console.log(dataSelect);
          })

        })

      })
      console.log("Success");
      console.log(insertId);
      req.flash('addProjectSuccess', 'Well Done! add project success')
      res.redirect('/projects');


    } else {

      console.log("data kosong");
      req.flash('dataNull', 'Sory! data cant null ')
      res.redirect('/projects/add');

    }

    // })
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=======================END POST ADD===========================");
    // res.redirect('/projects/add');

  })

  /* Router Get EDIT*/
  router.get('/edit/:projectid', loginSession.isLoggedIn, function (req, res, next, ) {

    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=======================GET EDIT PROJECTS=============================");
    console.log("");
    console.log("");
    console.log("");

    console.log(req.url);

    let takeDbProject = `SELECT * 
    FROM members  
    INNER JOIN projects ON projects.projectid=members.projectid
    WHERE projects.projectid = '${req.params.projectid}'`;

    console.log(takeDbProject);

    pool.query(takeDbProject, (err, dbProjectResult) => {

      let takeFullname = `SELECT *
      FROM members
      INNER JOIN users ON users.userid=members.userid
      WHERE projectid = '${req.params.projectid}'`

      pool.query(takeFullname, (err, dataFullname) => {

        let userData = `SELECT * FROM users`
        pool.query(userData, (err, showUser) => {

          console.log("dataFullname VV");
          console.log(dataFullname);

          console.log("dataUser VV");
          console.log(showUser);

          console.log("dataTEST VV");
          console.log(dbProjectResult);



          res.render('projects/edit',
            {
              data: dbProjectResult.rows, nav,
              dataMember: dataFullname.rows.map(item => item.userid),
              dataUser: showUser.rows,
              user: req.session.user

            })

        })

      })

    })

  })

  /*Router POST EDIT */
  router.post('/edit/:projectid', loginSession.isLoggedIn, function (req, res, next) {

    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=======================GET POST=============================");
    console.log("");
    console.log("");
    console.log("");

    let editID = req.params.projectid
    let { nameProject, membersck } = req.body
    console.log(req.body.membersck);
    console.log(editID);



    let updateProject = `UPDATE projects SET name = '${nameProject}' WHERE projectid = '${editID}'`
    console.log(updateProject);

    pool.query(updateProject, (err, updateProject) => {

      let tbDelMembers = `DELETE FROM members
      WHERE projectid = '${editID}'`;
      console.log(tbDelMembers);

      pool.query(tbDelMembers, (err, deleteMember) => {

        let tbInsertMember = 'INSERT INTO members (userid, roleid, projectid) VALUES'
        console.log(tbInsertMember);
        if (typeof membersck == 'string') {
          tbInsertMember += `(${membersck}, ${editID});`
        } else {
          let dtMember = membersck.map(item => {
            return `(${item}, ${editID})`
          }).join(',')

          tbInsertMember += `${dtMember}`
        }

        pool.query(tbInsertMember, (err, insertDTMember) => {
          req.flash('editSuccess', 'Well done!! edit data success ')
          res.redirect('/projects')

        })
      })

    })

  })

  /* GET DELETE */
  router.get('/delete/:userid', loginSession.isLoggedIn, function (req, res) {
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=====================GET DELETE=============================");
    console.log("");
    console.log("");
    console.log("");
    let dataID = req.params.userid
    let delMember = `DELETE FROM members WHERE userid = ${dataID}`
    pool.query(delMember, (err, delDTmember) => {

      console.log(delMember);
      req.flash('deleteProject', 'Okey Delete Success!!')
      res.redirect('/projects')
    })

  })



  // ==================== ROUTER OVERVIEW AREA =================== \\

  /*GET OVERVIEW */
  router.get('/overview/:projectid', loginSession.isLoggedIn, (req, res, next) => {
    let nav1 = 2

    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=====================GET OVERVIEW=============================");
    console.log("");
    console.log("");
    console.log("");


    let dtParams = req.params.projectid //using for dtParams sidebar
    let dataDB = `SELECT * 
    FROM members
    INNER JOIN projects ON projects.projectid=members.projectid
    INNER JOIN users ON users.userid=members.userid
    WHERE projects.projectid = '${dtParams}'`

    console.log(dataDB);
    pool.query(dataDB, (err, procdataDB) => {

      let countBug = `SELECT COUNT (tracker) AS total FROM issues WHERE tracker='Bug' AND projectid='${dtParams}'`
      let countIssueBug = `SELECT COUNT(*) AS total FROM issues WHERE projectid = '${dtParams}' AND tracker = 'Bug' AND status !='Closed'`

      pool.query(countBug, (err, pBug) => {
        pool.query(countIssueBug, (err, countStatusBUG) => {
          let issueBug = pBug.rows[0].total
          let closedBug = countStatusBUG.rows[0].total
          console.log('dtIssue > ', issueBug);
          console.log('closedBug > ', closedBug);


          let cFeature = `SELECT COUNT (tracker) AS total FROM issues WHERE tracker='Feature' AND projectid='${dtParams}'`
          pool.query(cFeature, (err, issueFeature) => {

            let countFeature = issueFeature.rows[0].total
            console.log('issueFeature > ', countFeature);


            let stFeature = `SELECT COUNT(*) AS total FROM issues WHERE projectid = '${dtParams}' AND tracker = 'Feature' AND status !='Closed'`
            pool.query(stFeature, (err, bugFeatureCount) => {

              let bugFeature = bugFeatureCount.rows[0].total
              console.log('dtFeature >', bugFeature);



              let cSupport = `SELECT COUNT (tracker) AS total FROM issues WHERE tracker='Support' AND projectid='${dtParams}'`
              let stSupport = `SELECT COUNT(*) AS total FROM issues WHERE tracker='Support' AND projectid='${dtParams}' AND status != 'Closed'`

              pool.query(cSupport, (err, dtSupport) => {
                pool.query(stSupport, (err, dtstSupport) => {
                  let issuesSupport = dtSupport.rows[0].total
                  let bugSupport = dtstSupport.rows[0].total
                  console.log('issuesSupport > ', issuesSupport);
                  console.log('bugSupport > ', bugSupport);


                  res.render('projects/overview', {
                    dataProc: procdataDB.rows, dtParams, nav1, nav,
                    issueBug, closedBug, countFeature, bugFeature, issuesSupport, bugSupport,
                    user: req.session.user

                  })



                })
              })
            })
          })
        })
      })
    })
  })

  // ===================== MEMBER ROUTER AREA ========================================\\
  /*GET DATA MEMBER*/
  router.get('/listMember/:projectid', loginSession.isLoggedIn, (req, res, next) => {
    let nav1 = 2
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=====================GET LIST MEMBER=============================");
    console.log("");
    console.log("");
    console.log("");
    let dtParams = req.params.projectid //using for dtParams sidebar
    console.log(dtParams);

    let url = (req.url == `/listMember/${dtParams}`) ? `/listMember/${dtParams}?page=1` : req.url;

    console.log(url);

    // METHOD FILTER 

    const { ck1, id_member, ck2, nameMember, ck3, positionMember } = req.query;

    let filter = [];
    console.log("REQUEST vvvv QUERY");
    console.log(req.query);

    const page = req.query.page || 1;
    const limit = 3;
    const offset = (page - 1) * limit;

    if (ck1 && id_member) {
      ceklist = true
      filter.push(`members.userid = '${id_member}'`)
    }
    if (ck2 && nameMember) {
      ceklist = true
      filter.push(`users.firstname = '${nameMember}'`)
    }
    if (ck3 && positionMember) {
      ceklist = true
      filter.push(`members.roleid='${positionMember}'`)
    }

    //count pagination
    let sqlCountMember = `SELECT COUNT (id) AS total 
      FROM (SELECT * FROM members 
      INNER JOIN projects ON members.projectid=projects.projectid
      INNER JOIN users ON members.userid=users.userid WHERE projects.projectid='${dtParams}'`

    if (filter.length > 0) {
      sqlCountMember += ` AND ${filter.join(" AND ")} `
    }
    sqlCountMember += ` ) AS count_member`

    pool.query(sqlCountMember, (err, dtCOUNT) => {


      console.log("");
      console.log("");
      console.log("");
      console.log("============database SQL 1============ ");
      console.log(sqlCountMember);
      console.log("");
      console.log("cek COUNT");
      console.log(dtCOUNT.rows[0].total);

      const total = dtCOUNT.rows[0].total

      const pages = Math.ceil(total / limit)

      console.log(filter);
      console.log(`this Total Column table MEMBER> ${total} `);
      console.log("");
      console.log("");
      console.log("");

      //database 2 SHOW ALL DATA FILTERING
      let sqlProjects = `SELECT * 
          FROM members
          JOIN projects ON projects.projectid=members.projectid
          JOIN users ON users.userid=members.userid
          WHERE projects.projectid = '${dtParams}'`

      if (filter.length > 0) {
        sqlProjects += ` AND ${filter.join(" AND ")}`
      }
      sqlProjects += ` ORDER BY projects.projectid LIMIT ${limit} OFFSET ${offset}`

      console.log();
      console.log("");
      console.log("");
      console.log("============database SQL 2============ ");
      console.log(sqlProjects);
      console.log("");
      console.log("");

      let sqlOptionMember = `SELECT optionmember FROM users WHERE userid = ${req.session.user.userid}`

      pool.query(sqlOptionMember, (err, dtOption) => {

        pool.query(sqlProjects, (err, dtRespon) => {
          console.log("DATA RESPON |v|");
          console.log(dtRespon.rows);

          res.render('projects/members/list', {
            dtProject: dtRespon.rows, dtParams, nav, nav1,
            pagination: {
              page, pages, total, url
            },
            query: req.query,
            dataOption: JSON.parse(dtOption.rows[0].optionmember),
            successAddmember: req.flash('successAddMember'),
            user: req.session.user


          })

        })

      })

    })

  })


  /* POST PROJECTOPTIONS FOR CHECK OPTION LIST MEMBER */
  router.post('/optionsListMember/:projectid', loginSession.isLoggedIn, function (req, res) {

    console.log("");
    console.log("");
    console.log("");
    console.log("======== WORK ROUTER PROJECTS/PROJECTOPTION LIST MEMBER ======");
    console.log("========================== STARt =============================");
    console.log("");
    console.log("");
    console.log("");
    let dataParams = req.params.projectid
    console.log(dataParams);


    let sqlUpdateUsers = `UPDATE users SET optionmember = '${JSON.stringify(req.body)}' WHERE userid = ${req.session.user.userid}`

    console.log(JSON.stringify(req.body));
    console.log(req.body);


    console.log(`dataOptionProject> ${sqlUpdateUsers}`);
    pool.query(sqlUpdateUsers, (err, dataUpdate) => {

      console.log(dataUpdate.rows);
      res.redirect(`/projects/listMember/${dataParams}`)
    })

  })



  /** GET EDIT MEMBERS */
  router.get('/editMember/:userid/:dtParams', loginSession.isLoggedIn, (req, res, next) => {
    nav1 = 3
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("===================== GET EDIT MEMBERS =============================");
    console.log("");
    console.log("");
    console.log("");

    dtParams = req.params.dtParams
    dtUserID = req.params.userid

    console.log('PROJECT ID > ', dtParams);
    console.log('USERID > ', dtUserID);

    let tblMember = `SELECT users.userid, firstname, lastname, projects.projectid, name, roleid
    from members
    INNER JOIN projects ON projects.projectid=members.projectid
    INNER JOIN users ON users.userid=members.userid
    WHERE users.userid = '${dtUserID}'`

    pool.query(tblMember, (err, showDTedit) => {

      res.render('projects/members/edit', {
        dtEditShow: showDTedit.rows, dtParams, nav, nav1,
        user: req.session.user

      })
    })
  })

  /** POST EDIT MEMBER */
  router.post('/editDTMember/:userid/:dtParams', loginSession.isLoggedIn, (req, res, next) => {

    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("===================== POST EDIT MEMBERS =============================");
    console.log("");
    console.log("");
    console.log("");

    let dtParams = req.params.dtParams
    let userID = req.params.userid
    console.log('DATA PARAMS > ', dtParams);
    console.log('DATA USERID > ', userID);

    console.log(req.body);
    let RBPositionMember = req.body.memberPosition
    console.log(req.body.memberPosition);

    let sqlMemberUpdate = `UPDATE members SET roleid = '${RBPositionMember}'
    WHERE projectid = '${dtParams}' AND userid = '${userID}'`
    console.log(sqlMemberUpdate);

    pool.query(sqlMemberUpdate, (err, Updatemember) => {

      res.redirect(`/projects/listMember/${dtParams}`)
    })
  })

  /* GET DELETE */
  router.get('/deleteMember/:userid/:dtParams', loginSession.isLoggedIn, function (req, res) {
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=====================GET DELETE=============================");
    console.log("");
    console.log("");
    console.log("");

    let userid = req.params.userid
    let dtParams = req.params.dtParams
    let delMember = `DELETE FROM members WHERE projectid = '${dtParams}' AND userid = '${userid}'`
    console.log('dataID > ', userid);
    console.log('data PARAMS > ', dtParams);
    console.log(delMember);

    pool.query(delMember, (err, delDTmember) => {

      res.redirect(`/projects/listMember/${dtParams}`)
    })

  })

  /** GET ADD MEMBER */
  router.get('/addMembers/:dtParams', loginSession.isLoggedIn, (req, res, next) => {
    nav1 = 3
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("================== GET ADD MEMBER =============================");
    console.log("");
    console.log("");
    console.log("");

    let dtParams = req.params.dtParams;
    console.log(dtParams);


    let sqlData = `SELECT userid, firstname, lastname 
    FROM users 
    WHERE userid NOT IN (SELECT userid FROM members WHERE members.projectid = ('${dtParams}'))`
    console.log(sqlData);

    pool.query(sqlData, (err, addMember) => {
      res.render('projects/members/add', {
        dataDB: addMember.rows, dtParams, nav, nav1,
        warningAdd: req.flash('warningAddMember'),
        user: req.session.user

      })
    })

  })

  /** POST ADD MEMBER */
  router.post('/postAddMember/:dtParams', loginSession.isLoggedIn, (req, res, next) => {

    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("================== POST ADD MEMBER =============================");
    console.log("");
    console.log("");
    console.log("");



    let projectid = req.params.dtParams
    const { namemember, memberPosition } = req.body

    if (namemember && memberPosition) {

      let sqlInsertMember = `INSERT INTO members (userid, projectid, roleid) VALUES  ('${namemember}', '${projectid}','${memberPosition}')`

      console.log('Insert > ', sqlInsertMember);
      console.log(req.params.dtParams);
      console.log(req.body);

      pool.query(sqlInsertMember, (err, insertProcess) => {

        req.flash('successAddMember', 'YEAY!! Add Member SUCCESS')
        res.redirect(`/projects/listMember/${projectid}`)

      })

      console.log('Success');

    } else {
      console.log('DAMN');
      req.flash('warningAddMember', 'SORY MR!! You Must Check ALL')
      res.redirect(`/projects/addMembers/${projectid}`)
    }
  })




  // =================== ROUTER DETAIL ISSUES AREA ======================\\

  router.get('/issuesList/:projectid', loginSession.isLoggedIn, (req, res, next) => {
    nav1 = 4
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("===================== GET PROCESS LIST ISSUES MEMBER =============================");
    console.log("");
    console.log("");
    console.log("");
    let dtParams = req.params.projectid //using for dtParams sidebar
    console.log('data Params > ', dtParams);

    //-------------filter
    let { ck1id,
      idProject,
      ck2Subject,
      subjectProject,
      ck3Tracker,
      trackerIssue } = req.query
    console.log('data Req Query > ', req.query);

    let url = (req.url == `/issuesList/${dtParams}`) ? `/issuesList/${dtParams}?page=1` : req.url
    console.log('data URL > ', url);

    let filter = []
    const page = req.query.page || 1;
    console.log('data ppage >', page);

    const limit = 3;
    const offset = (page - 1) * limit;
    console.log(offset);



    if (ck1id && idProject) {
      checklist = true
      filter.push(`issueid = '${idProject}'`)
    }
    if (ck2Subject && subjectProject) {
      checklist = true
      filter.push(`subject = '${subjectProject}'`)
    }
    if (ck3Tracker && trackerIssue) {
      checklist = true
      filter.push(`tracker = '${trackerIssue}'`)
    }

    // db1 pagination COUNTING
    let idIssueCOUNT = `SELECT COUNT (id) AS total FROM (SELECT issueid as id
    FROM issues WHERE projectid = '${dtParams}'`;


    if (filter.length > 0) {
      idIssueCOUNT += ` AND  ${filter.join(" AND ")}`
    }
    idIssueCOUNT += `) AS project_issue`
    console.log('COUNTING > ', idIssueCOUNT);

    pool.query(idIssueCOUNT, (err, count) => {
      const total = count.rows[0].total
      console.log(`this Total Column table PROJECTS> ${total} `);
      console.log("");
      console.log("");
      console.log("");

      const pages = Math.ceil(total / limit)
      console.log('data pages > ', pages);

      //db 2 Show Data IN Issues
      idIssueCOUNT = `SELECT *
      FROM issues WHERE projectid = '${dtParams}'`
      if (filter.length > 0) {
        idIssueCOUNT += ` AND ${filter.join(" AND ")}`
      }
      idIssueCOUNT += ` ORDER BY issueid DESC LIMIT ${limit} OFFSET ${offset}`

      console.log("============database SQL 2============ ");
      console.log(idIssueCOUNT);
      console.log("");
      console.log("");
      console.log("");

      let optionIssue = `SELECT optionlist FROM users WHERE userid = ${req.session.user.userid}`

      pool.query(optionIssue, (err, optionIssueShow) => {

        pool.query(idIssueCOUNT, (err, call) => {

          res.render('projects/issues/list', {
            issueAll: call.rows,
            dtParams, moment, nav, nav1,
            pagination: { page, pages, total, url },
            dataOptionIssue: JSON.parse(optionIssueShow.rows[0].optionlist),
            successAddIssue: req.flash('successAddIssue'),
            successDELETEIssue: req.flash('deleteIssue'),
            successEditIssue: req.flash('successEdit'),
            failedAddIssue: req.flash('failedAddIssue'),
            user: req.session.user



          })

        })

      })


    })

  })


  /**GET OPTION ISSUE */
  router.post('/optionIssue/:dtParams', loginSession.isLoggedIn, (req, res, next) => {

    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=============== GET OPTION ISSUES PROJECT =====================");
    console.log("");
    console.log("");
    console.log("");
    let dtParams = req.params.dtParams //using for dtParams sidebar
    console.log(dtParams);

    let optionIssue = `UPDATE users SET optionlist='${JSON.stringify(req.body)}' where userid='${req.session.user.userid}'`
    console.log(optionIssue);

    pool.query(optionIssue, (err, updateOption) => {
      res.redirect(`/projects/issuesList/${dtParams}`)
    })

  })

  /** GET ADD ISSUES */
  router.get('/issuesAddList/:dtParams', loginSession.isLoggedIn, (req, res, next) => {
    nav1 = 4
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=============== GET ADD ISSUES PROJECT =====================");
    console.log("");
    console.log("");
    console.log("");
    let dtParams = req.params.dtParams //using for dtParams sidebar
    console.log(dtParams);

    console.log('Session > ', req.session.user);



    let sqlLite = `SELECT * FROM members INNER JOIN users ON users.userid = members.userid INNER JOIN projects ON projects.projectid = members.projectid WHERE members.projectid = '${dtParams}'`


    pool.query(sqlLite, (err, dtUser) => {

      let sqlParentIDissue = `SELECT *
      FROM issues WHERE projectid = '${dtParams}';`
      pool.query(sqlParentIDissue, (err, dataParentIssue) => {

        res.render('projects/issues/add', {
          dataUser: dtUser.rows, dtParams, nav, nav1,
          user: req.session.user, moment,
          idParentIssue: dataParentIssue.rows,
          user: req.session.user

        })
      })

    })
  })

  /** POST ADD ISSUES */
  router.post('/PostIssuesAdd/:dtParams', loginSession.isLoggedIn, (req, res, next) => {
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=============== POST ISSUES PROJECT =====================");
    console.log("");
    console.log("");
    console.log("");


    let dtParams = req.params.dtParams //using for dtParams sidebar
    console.log(dtParams);
    console.log(req.body);

    let userid = req.session.user.userid;

    let dataFile = req.files.sampleFile;
    console.log('Request File >', req.files.sampleFile);

    if (req.files == 0) {
      return res.status(400).send('No Files Were Uploaded');
    }
    let nameFile = dataFile.name.replace('.', `${Date.now()}.`)

    dataFile.mv(path.join(__dirname, `../public/images/${nameFile}`)), (err, responseData) => {
      if (err)
        return res.status(500).send(err);
    }

    const {
      trackerissue,
      subjectform,
      descriptionform,
      statusIssue,
      priorityissue,
      assigneeform,
      startdateform,
      duedateform,
      estimatedform,
      doneform,
      authoradd } = req.body

    let AddIssue = `INSERT INTO issues(
      projectid, tracker, subject, description, status, priority, assignee, startdate, duedate, estimatedtime, files, author, createdtdate, done)
        VALUES ('${dtParams}', '${trackerissue}', '${subjectform}', '${descriptionform}', '${statusIssue}', '${priorityissue}', '${assigneeform}', '${startdateform}', '${duedateform}', '${estimatedform}','${nameFile}', '${userid}','${moment().format('YYYY-MM-DD hh:mm:ss')}', '${doneform}');`


    console.log(AddIssue);
    pool.query(AddIssue, (err, insertIssue) => {

      let activityIssue = `INSERT INTO activity(title, description, author, time)
        VALUES ( ('${subjectform}''#${dtParams}''${statusIssue}'), '${descriptionform}', '${userid}', '${moment().format('YYYY-MM-DD hh:mm:ss')}');`

      console.log('sql Activity > ', activityIssue);
      pool.query(activityIssue, (err, insertAct) => {

        if (err) {

          req.flash('failedAddIssue', 'Sorry!! Add Issue Failed')
          res.redirect(`/projects/issuesList/${dtParams}`)

        } else {

          req.flash('successAddIssue', 'YEAY!! Add Issue SUCCESS')
          res.redirect(`/projects/issuesList/${dtParams}`)
        }

      })

    })


  })

  /** GET EDIT ISSUE */
  router.get('/editListIssue/:issueid/:dtParams', loginSession.isLoggedIn, (req, res, next) => {
    nav1 = 4
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=============== EDIT LIST ISSUES  =====================");
    console.log("");
    console.log("");
    console.log("");
    let dtParams = req.params.dtParams //using for dtParams sidebar
    let issueid = req.params.issueid //using for table issues

    console.log(dtParams);
    console.log(req.body);

    let allMembers = `SELECT * FROM members INNER JOIN users ON users.userid = members.userid INNER JOIN projects ON projects.projectid = members.projectid WHERE members.projectid = '${dtParams}'`

    pool.query(allMembers, (err, dtMember) => {

      let sqlSelect = `SELECT * FROM issues WHERE issueid ='${issueid}'`
      pool.query(sqlSelect, (err, allIssue) => {

        res.render('projects/issues/edit', {
          dtAssignee: dtMember.rows, nav, nav1,
          dtIssue: allIssue.rows, moment,
          dtParams,
          user: req.session.user

        })

      })

    })

  })

  /**GET DELETE ISSUE */
  router.get('/deleteIssue/:issueid/:dtParams', loginSession.isLoggedIn, (req, res) => {
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=============== DELETE LIST ISSUES  =====================");
    console.log("");
    console.log("");
    console.log("");
    let issueid = req.params.issueid //using for issuid
    let dtParams = req.params.dtParams //using for dtParams sidebar
    console.log(issueid);
    console.log(dtParams);

    let deleteIssue = `DELETE FROM issues WHERE issueid = '${issueid}'`
    console.log(deleteIssue);

    pool.query(deleteIssue, (err, processDelete) => {
      req.flash('deleteIssue', 'YEAY!! Delete Issue SUCCESS')
      res.redirect(`/projects/issuesList/${dtParams}`)
    })

  })

  /**POST EDIT DATA */
  router.post('/postEdit/:issueid/:dtParams', loginSession.isLoggedIn, (req, res) => {
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=============== POST EDIT ISSUES  =====================");
    console.log("");
    console.log("");
    console.log("");
    let issueid = req.params.issueid //using for issuid
    let dtParams = req.params.dtParams //using for dtParams sidebar
    console.log(issueid);
    console.log(dtParams);
    let dtAuthor = req.session.user.userid


    console.log(req.body);

    const { trackerissueEdit,
      subjectformEdit,
      descriptionformEdit,
      createddate,
      updateDate,
      statusIssueEdit,
      priorityissueEdit,
      assigneeformEdit,
      startdateformEdit,
      duedateformEdit,
      estimatedformEdit,
      doneformEdit,
      spenttimeform,
      targetversionform,
      parenttaskform,
      filetTbl
    } = req.body


    let sqlData = `UPDATE issues  SET  tracker='${trackerissueEdit}', subject='${subjectformEdit}', description='${descriptionformEdit}', status='${statusIssueEdit}', priority='${priorityissueEdit}', assignee='${assigneeformEdit}', startdate='${startdateformEdit}', duedate='${duedateformEdit}', estimatedtime='${estimatedformEdit}', targetversion='${targetversionform}', done='${doneformEdit}', updatedate='${moment().format('YYYY-MM-DD hh:mm:ss')}'`
    console.log('data Sql Original > ', sqlData);
    console.log("");
    console.log("");


    if (spenttimeform > 0) {
      sqlData += `, spenttime = ${req.body.spenttimeform}`
      console.log("Spentime Include");
    }
    if (statusIssueEdit == 'Closed') {
      sqlData += `, closeddate='${moment().format('YYYY-MM-DD hh:mm:ss')}'`
      console.log("Closed Include");
    }
    if (parenttaskform > 0) {
      sqlData += `, parenttask='${parenttaskform}'`
      console.log("Parent task Include");

    }
    if (req.files) {

      console.log('Req Files');
      let dataFile = req.files.sampleFile;
      let nameFile = dataFile.name.replace('.', `${Date.now()}.`)

      dataFile.mv(path.join(__dirname, `../public/images/${nameFile}`)), (err, responseData) => {
        if (err)
          return res.status(500).send(err);
      }

      sqlData += `, files='${nameFile}'`

    }
    sqlData += ` WHERE projectid=${dtParams} AND issueid='${issueid}'`
    console.log(sqlData);

    pool.query(sqlData, (err, dtProcess) => {

      let updateAct = `INSERT INTO activity( time, title, description, author) VALUES ('${moment().format('YYYY-MM-DD hh:mm:ss')}', '${subjectformEdit}', '${descriptionformEdit}', '${dtAuthor}')`

      console.log(updateAct);

      pool.query(updateAct, (err, processAct) => {

        req.flash('successEdit', 'Congrats!! Edit Data Succcess')
        res.redirect(`/projects/issuesList/${dtParams}`)
      })

    })

  })

  // ==================  ACTIVITY AREA PROCESS ============ \\

  router.get('/activityMember/:projectid', loginSession.isLoggedIn, (req, res, next) => {
    nav1 = 7
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=====================GET PROCESS ACITIVITY MEMBER=============================");
    console.log("");
    console.log("");
    console.log("");
    let dtParams = req.params.projectid //using for dtParams sidebar
    console.log(dtParams);

    var days = 7;
    var now = Date.now();
    var date = new Date();
    var sevendays = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));
    console.log(sevendays);

    let sqlAct = `SELECT activity.activityid,time, title, description, author, users.userid, firstname, lastname 
    FROM activity 
    INNER JOIN users ON activity.author=users.userid WHERE time BETWEEN '${moment(sevendays).format('YYYY-MM-DD')}' AND '${moment(now).add(1, 'days').format('YYYY-MM-DD')}' order by time desc`;

    console.log('this date >', sqlAct);
    pool.query(sqlAct, (err, data) => {
      let result = {}
      data.rows.forEach((item) => {
        if (result[moment(item.time).format('dddd')] && result[moment(item.time).format('dddd')].data) {
          result[moment(item.time).format('dddd')].data.push(item);
        } else {
          result[moment(item.time).format('dddd')] = { date: moment(item.time).format('YYYY-MM-DD'), data: [item] };
        }
      })
      console.log('data result > ', result);
      res.render('projects/activity', {
        dtParams, path,
        isAdmin: req.session.user,
        data: result,
        now,
        sevendays,
        moment,
        user: req.session.user

      })
    })
  })


  // ======================== area test tamplate
  /*ROUTER CHECK TEMPLATES */
  router.get('/check', loginSession.isLoggedIn, (req, res) => {
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=====================GET CHECK TEMPLATE=============================");
    console.log("");
    console.log("");
    console.log("");
    let dtParams = req.params.projectid //using for dtParams sidebar
    console.log(dtParams);
    res.render('SIDEBAR TEMP(NOT USED)', {
      dtParams,
      user: req.session.user
    })
  })


  router.get('/check2', loginSession.isLoggedIn, (req, res) => {
    console.log("");
    console.log("");
    console.log("");
    console.log("WORK ROUTER PROJECTS");
    console.log("=====================GET CHECK TEMPLATE=============================");
    console.log("");
    console.log("");
    console.log("");
    let dtParams = req.params.projectid //using for dtParams sidebar
    console.log(dtParams);
    res.render('noSidebar', {
      dtParams,
      user: req.session.user
    })
  })



  return router;

}