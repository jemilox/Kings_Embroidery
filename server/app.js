var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded( {extended: true});
var portDecision = process.env.PORT || 3000;
var pg = require('pg');
//pg.defaults.ssl = true;


app.listen( portDecision, function () {
  console.log("3000 is up!");
});//end server up

app.get('/', urlencodedParser, function (req, res) {
  console.log('base url hit');
  res.sendFile(path.resolve('public/index1.html'));
});

app.post('/add', urlencodedParser, function (req, res) {
  console.log('in post add');
  res.send( 'true' );
});

//new copy/paste from heroku

// app.post('/mow', urlencodedParser, function (req, res) {
//   console.log('in add');
//   pg.connect(process.env.postgresql-cubed-19933, function(err, client) {
//     if (err) throw err;
//     console.log('Connected to postgres! Getting schemas...');
//
//     client
//       .query('SELECT * FROM jobs')
//       .on('row', function(row) {
//         console.log(JSON.stringify(row));
//         res.send({success: true});
//       });
//   });
//
// });


// app.use(express.static('public'));
