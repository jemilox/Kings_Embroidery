var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded( {extended: false});
var portDecision = process.env.PORT || 3000;
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/jobstwo';

app.use(bodyParser.json());

app.listen( portDecision, function () {
  console.log("3000 is up!");
});//end server up

app.get('/', urlencodedParser, function (req, res) {
  console.log('base url hit');
  res.sendFile(path.resolve('public/index.html'));
});



app.get('/all', function (req, res) {
  console.log('in get /all');
  pg.connect(connectionString, function (err, client, done) {
      if (err){
        console.log(err);
      }else{
        var alljobs = [];
        var queryResults = client.query('SELECT * FROM jobs');
        //console.log(queryResults);
        queryResults.on('row', function (row) {
          alljobs.push(row);
          //console.log('alljobs', alljobs[0]);
        });
        queryResults.on('end', function () {
          done();
          return res.json(alljobs);
          //end queryResults function
        });//end queryResults on function
      }//end else
  });//end pg connect
});//end app.get

app.post('/newjob', urlencodedParser, function (req, res) {
  console.log('in .post newjob');
  console.log('req.body', req.body.company);
  var company = req.body.company;
  var duedate = req.body.duedate;
  var pieces = req.body.pieces;
  var complete = req.body.complete;
  var harddate = req.body.harddate;
  var notes = req.body.notes;
  console.log(company, duedate, pieces);
  pg.connect(connectionString, function (err, client, done) {
      if (err){
        console.log(err);
      }else{
        console.log('connected to database');
        var queryResults = client.query('INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes) VALUES($1, $2, $3, $4, $5, $6)', [company, duedate, pieces, complete, harddate, notes]);
        queryResults.on('end', function () {
          done();
          res.send({success: true});
        });//end query
      }//end else
    });//end pg conect

  //create variables from req
});

app.delete('/delete', urlencodedParser, function (req, res) {
  console.log('in delete');
  console.log(req.body.id);
  var id = req.body.id;
  pg.connect(connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else{
      console.log('connected to database in delete');
      client.query('DELETE from jobs WHERE id = $1', [id]);
      done();
      res.send({success: true});
    }
  });
});
//edit pieces
app.post('/edit', urlencodedParser, function (req, res) {
  console.log('in edit post');
  console.log(req.body);
  var id = req.body.id;
  var pieces = req.body.pieces;
  pg.connect(connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else{
      console.log('connected to db in edit');
      client.query('UPDATE jobs SET pieces = $1 WHERE id = $2', [pieces, id]);
      done();
      res.send({success: true});
    }
  });
});//end edit pieces

//edit notes
app.post('/editnotes', urlencodedParser, function (req, res) {
  console.log('in edit notes post');
  console.log(req.body);
  var id = req.body.id;
  var notes = req.body.notes;
  pg.connect(connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else{
      console.log('connected to db in edit');
      client.query('UPDATE jobs SET notes = $1 WHERE id = $2', [notes, id]);
      done();
      res.send({success: true});
    }
  });
});//end edit notes
//edit complete
app.post('/editcomplete', urlencodedParser, function (req, res) {
  console.log('in edit post complete');
  console.log(req.body);
  var id = req.body.id;
  var complete = req.body.complete;
  pg.connect(connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else{
      console.log('connected to db in edit');
      client.query('UPDATE jobs SET complete = $1 WHERE id = $2', [complete, id]);
      done();
      res.send({success: true});
    }
  });
});//end edit complete
//edit harddate
app.post('/editharddate', urlencodedParser, function (req, res) {
  console.log('in edit post harddate');
  console.log(req.body);
  var id = req.body.id;
  var harddate = req.body.harddate;
  pg.connect(connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else{
      console.log('connected to db in edit');
      client.query('UPDATE jobs SET harddate = $1 WHERE id = $2', [harddate, id]);
      done();
      res.send({success: true});
    }
  });
});//end edit harddate

app.post('/editcompany', urlencodedParser, function (req, res) {
  console.log('in edit post');
  console.log(req.body);
  var id = req.body.id;
  var company = req.body.company;
  pg.connect(connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else{
      console.log('connected to db in edit');
      client.query('UPDATE jobs SET company = $1 WHERE id = $2', [company, id]);
      done();
      res.send({success: true});
    }
  });
});

app.post('/editdate', urlencodedParser, function (req, res) {
  console.log('in edit post');
  console.log(req.body);
  var id = req.body.id;
  var duedate = req.body.duedate;
  pg.connect(connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else{
      console.log('connected to db in edit');
      client.query('UPDATE jobs SET duedate = $1 WHERE id = $2', [duedate, id]);
      done();
      res.send({success: true});
    }
  });
});


app.get('/search', function (req, res) {
  console.log('in get /search');
  pg.connect(connectionString, function (err, client, done) {
      if (err){
        console.log(err);
      }else{
        var searchedjobs = [];
        var searchThis = '%' + req.query.search + '%';
        var queryResults = client.query('SELECT * FROM jobs WHERE company LIKE $1', [searchThis]);
        //console.log(queryResults);
        queryResults.on('row', function (row) {
          searchedjobs.push(row);
          //console.log('alljobs', alljobs[0]);
        });
        queryResults.on('end', function () {
          done();
          return res.json(searchedjobs);
          //end queryResults function
        });//end queryResults on function
      }//end else
  });//end pg connect
});//end app.get

app.use(express.static('public'));
