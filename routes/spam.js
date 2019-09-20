//==========Router Get Activity=========\\
router.get('/activity/:projectid', LoginSession.isLoggedIn, (req, res) => {
    let path = "activity"
    console.log('=====================Router Acitivity get=============================');
    console.log("==");
    console.log("==");
    console.log("==");
    var days = 7;
    var now = new Date();
    var date = new Date();
    var sevendays = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));
    let sql = `SELECT * FROM activity INNER JOIN users ON activity.author=users.userid WHERE time BETWEEN '${moment(sevendays).format('YYYY-MM-DD')}' AND '${moment(now).add(1, 'days').format('YYYY-MM-DD')}' order by time desc`;
    console.log('this sql acitivity GET>>', sql);
    pool.query(sql, (err, data) => {
      let result = {};
      data.rows.forEach((item) => {
        if (result[moment(item.time).format('dddd')] && result[moment(item.time).format('dddd')].data) {
          result[moment(item.time).format('dddd')].data.push(item);
        } else {
          result[moment(item.time).format('dddd')] = { date: moment(item.time).format('YYYY-MM-DD'), data: [item] };
        }
      })
      console.log(result);
      
      res.render('projects/activity', {
        projectid: req.params.projectid,
        path,
        isAdmin: req.session.user,
        data: result,
        now,
        sevendays,
        moment, nav,nav1
      })
    })
  })
Collapse



