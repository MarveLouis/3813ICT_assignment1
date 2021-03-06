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
    var uemail = req.body.email;
    var urole;
    var userObj;

    fs.readFile('authdata.json', 'utf8', function(err, data) {

    if (err) {
        console.log(err);
        res.send({'username':'','success':false});

    } else {

    userObj = JSON.parse(data);
        for (let i = 0; i < userObj.length; i++) {
            if (userObj[i].name == uname) {

                for (let j = 0; j < userObj.length; j++) {
                    if (userObj[j].email == uemail) {
                        urole = userObj[j].role;
                        res.send({'username':uname, 'email':uemail, 'role':urole, 'success':true});
                        return;
                    }
                }
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
  
            for (let i = 0; i < delUserObj.length; i++) {
                if (delUserObj[i].name == delUname) {
                    delete delUserObj[i];
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
  
    fs.readFile('authdata.json','utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            regUserObj = JSON.parse(data);
            regUserObj.push({'name':regUname, 'email':regUemail, 'role':regUrole})
            var newdata = JSON.stringify(regUserObj);
            fs.writeFile('authdata.json',newdata,'utf-8',function(err) {
                if (err) throw err;
                res.send({'username':regUname,'email':regUemail, 'role':regUrole,'success':true});
            });
        }
    });
});
  
    
//Route to retrieve group data
app.post('/api/groups', (req, res) => {

    fs.readFile('groupdata.json','utf-8', function(err, data) {

        if (err) {
            console.log(err);
        } else {
            var groupData = JSON.parse(data);
            res.send({groupData});
        }

    });
});

//Route to delete group
app.post('/api/delgroup', (req, res) => {

    var delGname = req.body.groupname;
    var delGroupObj;
  
    fs.readFile('groupdata.json','utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            delGroupObj = JSON.parse(data);
  
            for (let i = 0; i < delGroupObj.length; i++) {
                if (delGroupObj[i].name == delGname) {
                    delete delGroupObj[i];
                    break;
                }
            }
            var rawdeldata = delGroupObj.filter(o => Object.keys(o).length);
            var newdeldata = JSON.stringify(rawdeldata);
            fs.writeFile('groupdata.json',newdeldata,'utf-8',function(err) {
                if (err) throw err;
                res.send({'groupname':delGname,'success':true});
            });
        }
    });
});

//Route to handle group creation
app.post('/api/reggroup', (req, res) => {

    var regGroupObj;
    var regGname = req.body.groupname;
  
    fs.readFile('groupdata.json','utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            regGroupObj = JSON.parse(data);
            regGroupObj.push({'name':regGname})
            var newdata = JSON.stringify(regGroupObj);
            fs.writeFile('groupdata.json',newdata,'utf-8',function(err) {
                if (err) throw err;
                res.send({'groupname':regGname,'success':true});
            });
        }
    });
});
  