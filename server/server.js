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

//Route to handle login
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
    
//Route to retrieve user data
app.post('/api/users', (req, res) => {

    fs.readFile('authdata.json','utf-8', function(err, data) {

        if (err) {
            console.log(err);
        } else {
            var userData = JSON.parse(data);
            res.send({userData});
        }

    });
});

//Route to delete user
app.post('/api/del', (req, res) => {

    var delUname = req.body.username;
    var delUserObj;
  
    fs.readFile('authdata.json','utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            delUserObj = JSON.parse(data);
  
            for (let l=0;l<delUserObj.length;l++) {
                if (delUserObj[l].name == delUname) {
                    delete delUserObj[l];
                    break;
                }
            }
            var rawdeldata = delUserObj.filter(o => Object.keys(o).length);
            var newdeldata = JSON.stringify(rawdeldata);
            fs.writeFile('authdata.json',newdeldata,'utf-8',function(err) {
                if (err) throw err;
                res.send({'username':delUname,'success':true});
            });
        }
    });
});

//Route to handle user register
app.post('/api/reg', (req, res) => {
    var regUserObj;
    var regUname = req.body.username;
    var regUemail = req.body.email;
    var regUrole = req.body.role;
    console.log(regUname)
  
    fs.readFile('userdata.json','utf-8', function(err, data){
        if (err){
            console.log(err);
        } else {
        regUserObj = JSON.parse(data);
  
        for (let i=0;i<regUserObj.length;i++){
          if (regUserObj[i].name == regUname || regUserObj[i].email == regUemail){
            //Check for duplicates
            isUser = 1;
          }
        }
  
        if (isUser > 0){
          //Name already exists in the file
          console.log(req.body);
           res.send({'username':'','success':false});
         }else{
           //Add name to list of names
           regUserObj.push({'name':regUname,'email':regUemail,'role':regUrole})
           //Prepare data for writing (convert to a string)
           var newdata = JSON.stringify(regUserObj);
           fs.writeFile('userdata.json',newdata,'utf-8',function(err){
             if (err) throw err;
             //Send response that registration was successfull.
             res.send({'username':regUname,'email':regUemail,'role':regUrole,'success':true});
            });
         }
       }
    });
  });
  