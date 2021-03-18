var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded( {extended: false});
var portDecision = process.env.PORT || 3000;
var user = process.env.USER;
var password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;

var pg = require('pg');
var io = require('socket.io')(http);

var client = new pg.Client({
  ssl: {
    rejectUnauthorized: false,
  },
  user,
  password,
  database,
  port: 5432,
  host
}); 

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

app.use(bodyParser.json());

http.listen( portDecision, function () {
  console.log(portDecision + " is up!");
});

app.get('/', urlencodedParser, function (req, res) {
  console.log('base url hit');
  res.sendFile(path.resolve('public/index.html'));
});

app.get('/all', function (req, res) {
  var alljobs = [];
  const query = new pg.Query('SELECT * FROM jobs LEFT JOIN employees ON jobs.employeeid=employees.empid');
  client.query(query);

  query.on('row', function (row) {
    alljobs.push(row);
  });

  query.on('end', function () {
    return res.json(alljobs);
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/all query failure');
  });
});

app.get('/employees', function (req, res) {
  var allemployees = [];
  const query = new pg.Query('SELECT * FROM employees');
  client.query(query);

  query.on('row', function (row) {
    allemployees.push(row);
  });

  query.on('end', function () {
    return res.json(allemployees);
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/employees query failure');
  });
});

app.post('/newjob', urlencodedParser, function (req, res) {
  var company = req.body.company;
  var duedate = req.body.duedate;
  var pieces = req.body.pieces;
  var complete = req.body.complete;
  var harddate = req.body.harddate;
  var notes = req.body.notes;
  var employee = req.body.employeeid;
  var inprogress = req.body.inprogress;

  const query = new pg.Query('INSERT INTO jobs (company, duedate, pieces, complete, harddate, notes, employeeid, inprogress) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [company, duedate, pieces, complete, harddate, notes, employee, inprogress]);

  client.query(query);

  query.on('end', function () {
    io.emit('pingRefresh');
    res.send({success: true});
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/newjob query failure');
  });
});

app.post('/newemployee', urlencodedParser, function (req, res) {
  var name = req.body.name;
  const query = new pg.Query('INSERT INTO employees (name, archived) VALUES($1, $2)', [name, false]);

  client.query(query);

  query.on('end', function () {
    res.send({success: true});
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/newemployee query failure');
  });
});

app.delete('/delete', urlencodedParser, function (req, res) {
  var id = req.body.id;
  const query = new pg.Query('DELETE from jobs WHERE id = $1', [id]);

  client.query(query);

  query.on('end', function () {
    io.emit('pingRefresh');
    res.send({success: true});
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/delete query failure');
  });
});

//edit # of pieces
app.post('/edit', urlencodedParser, function (req, res) {
  var id = req.body.id;
  var pieces = req.body.pieces;
  const query = new pg.Query('UPDATE jobs SET pieces = $1 WHERE id = $2', [pieces, id]);
  client.query(query);

  query.on('end', function () {
    io.emit('pingRefresh');
    res.send({success: true});
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/edit pieces query failure');
  });
});

//edit notes
app.post('/editnotes', urlencodedParser, function (req, res) {
  var id = req.body.id;
  var notes = req.body.notes;
  const query = new pg.Query('UPDATE jobs SET notes = $1 WHERE id = $2', [notes, id]);
  client.query(query);

  query.on('end', function () {
    io.emit('pingRefresh');
    res.send({success: true});
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/edit notes query failure');
  });
});

//edit complete
app.post('/editcomplete', urlencodedParser, function (req, res) {
  var id = req.body.id;
  var complete = req.body.complete;
  const query1 = new pg.Query('UPDATE jobs SET complete = $1 WHERE id = $2', [complete, id]);
  const query2 = new pg.Query('UPDATE jobs SET inprogress = false WHERE id = $1', [id]);

  client.query(query1);
  client.query(query2);

  io.emit('pingRefresh');
  res.send({success: true});
});

// edit in progress
app.post('/editinprogress', urlencodedParser, function (req, res) {
  var id = req.body.id;
  var inprogress = req.body.inprogress;
  const query1 = new pg.Query('UPDATE jobs SET inprogress = $1 WHERE id = $2', [inprogress, id]);
  const query2 = new pg.Query('UPDATE jobs SET complete = false WHERE id = $1', [id]);
  
  client.query(query1);
  client.query(query2);

  io.emit('pingRefresh');
  res.send({success: true});
});

//edit harddate
app.post('/editharddate', urlencodedParser, function (req, res) {
  var id = req.body.id;
  var harddate = req.body.harddate;
  const query = new pg.Query('UPDATE jobs SET harddate = $1 WHERE id = $2', [harddate, id]);

  client.query(query);

  query.on('end', function () {
    io.emit('pingRefresh');
    res.send({success: true});
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/edit hard date query failure');
  });
});

//edit company
app.post('/editcompany', urlencodedParser, function (req, res) {
  var id = req.body.id;
  var company = req.body.company;
  const query = new pg.Query('UPDATE jobs SET company = $1 WHERE id = $2', [company, id]);

  client.query(query);

  query.on('end', function () {
    io.emit('pingRefresh');
    res.send({success: true});
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/edit company query failure');
  });
});

//edit date
app.post('/editdate', urlencodedParser, function (req, res) {
  var id = req.body.id;
  var duedate = req.body.duedate;
  const query = new pg.Query('UPDATE jobs SET duedate = $1 WHERE id = $2', [duedate, id]);

  client.query(query);
  
  query.on('end', function () {
    io.emit('pingRefresh');
    res.send({success: true});
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/edit date query failure');
  });
});

//edit name
app.post('/editname', urlencodedParser, function (req, res) {
  var id = req.body.id;
  var employeeid = req.body.employeeid;
  const query = new pg.Query('UPDATE jobs SET employeeid = $1 WHERE id = $2', [employeeid, id]);

  client.query(query);

  query.on('end', function () {
    io.emit('pingRefresh');
    res.send({success: true});
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/edit name query failure');
  });
});

//archive employee
app.post('/archive', urlencodedParser, function (req, res) {
  var id = req.body.id;
  const query = new pg.Query('UPDATE employees SET archived = $1 WHERE empid = $2', [true, id]);
  
  client.query(query);

  query.on('end', function () {
    io.emit('pingRefresh');
    res.send({success: true});
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/edit name query failure');
  });
});


app.get('/search', function (req, res) {
  var searchedjobs = [];
  var searchThis = '%' + req.query.search + '%';
  const query = new pg.Query('SELECT * FROM jobs WHERE company LIKE $1', [searchThis]);

  client.query(query);
  
  query.on('row', function (row) {
    searchedjobs.push(row);
  });
  
  query.on('end', function () {
    return res.json(searchedjobs);
  });

  query.on('error', err => {
    console.error(err.stack)
    return res.status(500).send('/search query failure');
  });
});

app.use(express.static('public'));


