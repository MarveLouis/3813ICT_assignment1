const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '../angular-app/dist/angular-app/')));
app.use(cors());

require('./routes.js')(app, path);
require('./socket.js')(app, io);
require('./listen.js')(http);

//Login
app.post('/api/auth', (req, res) => {

    var uname = req.body.username;
    var urole;
    var userObj;

    console.log(uname);

    fs.readFile('authdata.json', 'utf8', function(err, data) {

    if (err) {
        console.log(err);
        res.send({'username':'','success':false});

    } else {

    userObj = JSON.parse(data);
        for (let i = 0; i < userObj.length; i++) {
            if (userObj[i].name == uname) {
                urole = userObj[i].role;
                res.send({'username':uname, 'role':urole, 'success':true});
                console.log(urole);
                return;
            }
        }
    res.send({'username':uname,'success':false});
    }});
});
    
//user JSON
app.post('/api/users', (req, res) => {
    fs.readFile('userdata.json','utf-8', function(err, data){
      if (err){
          console.log(err);
      }else{
        var userData = JSON.parse(data);
        res.send({userData});
      }
    });
  });