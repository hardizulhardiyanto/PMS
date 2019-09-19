//// -- LEVEL 1
//// -- Tables and References

// Creating tables
Table activity {
  activityid integer [PK]
  time time
  tittle varcharacter (25)
  description varcharacter (25)
  author varcharacter (25)
}

Table isses {
  issuesid integer [PK]
  projectid integer 
  tracker varcharacter (25)
  subject varcharacter (25)
  description varcharacter (25)
  status varcharacter (25)
  assignee integer
  startdate date
  duedate date
  estimatedtime date
  done varcharacter (20)
  files text
  spenttime numeric
  targetvision varcharacter (20)
  author integer
  createddate date
  updatedate date
  closeddate date
  parentask integer 
}

Table member {
  id integer [PK]
  userid integer [ref: > users.userid]
  roleid integer
  projectid integer [ref: > projects.projectid]
}

Table projects {
  projectid integer [PK]
  nama varcharacter (25)
}

Table users {
  userid integer [PK]
  email varcharacter (25)
  firstname varcharacter (25)
  lasname varcharacter (25)
  roles varcharacter (25)
  password varcharacter (15)
}