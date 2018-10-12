'use strict';

var sqlite3 = require('sqlite3');
let db = new sqlite3.Database('.//test.db');


  exports.datatoJSON2 = function(req, res) {
    let sql = `SELECT Name, myTime.Employee_id, Approval_type, Duration, start_date, end_date, Approver_name, Approver_id FROM myTime JOIN Employee ON Employee.Employee_id = myTime.employee_id`; //query here 
    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        console.log(rows)
        // var output = "[{ Approver : { Approver Name :'"+row.Approver_name+"'";
        var output = '[';
        // res.json(rows)
        rows.forEach((row) => {
          //stringify
          if(row.Approver_id == req.params.ID){
            output = output + "{ \"Approver Name\": \""+row.Approver_name+"\"," + "\"Name\": \""+row.Name+"\"," + "\"Employee ID\": \""+row.employee_id+"\"," + "\"Approval Type\": \""+row.Approval_type+"\"," + "\"Duration\": \""+row.Duration+"\"," + "\"Start Date\": \""+row.start_date+"\"," + "\"End Date\": \""+row.end_date+"\" },";
          }
        });
        if(output[output.length-1] == ','){
          output = output.slice(0, -1);
        }
        output = output + ']'
        res.json(JSON.parse(output));
      });
  };
 
  exports.infopage = function(req, res){
    res.render('form', {
      title: "Candidate Registration",  
      action: "/",   
  });
  };

  exports.putdata = function(req,res){
    console.log(req.body);
    var query = 'INSERT INTO myTime(employee_id, id, Approval_type, Duration, start_date, end_date) VALUES(?,?,?,?,?,?)';
    db.run(query, [req.body.empid,req.body.id,req.body.type,req.body.duration,req.body.sdate,req.body.edate], function(err) {
      if (!err) {
        res.redirect('/show');
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
  }

  exports.conform = function(req,res){
      res.render('form1'); 
  }

  