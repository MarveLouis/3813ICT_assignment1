const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const fs = require('fs');
const assert = require('assert');

// CORS
const cors = require('cors')
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const dbURL = "mongodb://localhost:27017/mydb";
const dbName = "my_db";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

require('./routes.js')(app, path);
require('./socket.js')(app, io);
require('./listen.js')(http);

// the "index" route, which serves the Angular app
app.use(express.static(path.join(__dirname, '../angular-app/dist/angular-app/')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'../angular-app/dist/angular-app/index.html'))
});
app.get('/home', function(req,res){
    res.sendFile(path.join(__dirname,'../angular-app/dist/angular-app/index.html'))
});
app.get('/admin', function(req,res){
    res.sendFile(path.join(__dirname,'../angular-app/dist/angular-app/index.html'))
});
app.get('/group', function(req,res){
    res.sendFile(path.join(__dirname,'../angular-app/dist/angular-app/index.html'))
});

// Populate database
// let userData = [
//     { name: "super", pwd: 123 , role: 3 },
//     { name: "group", pwd: 123, role: 2 },
//     { name: "user", pwd: 123, role: 1 },
//     { name: "Louis", pwd: 123, role: 3 },
//     { name: "Ryoma", pwd: 123, role: 3}
// ];

// console.log("Setting up initial db state");
// MongoClient.connect(dbURL, function(err, db){
//     if(err) throw err;

//     let dbo = db.db(dbName);
//     dbo.collection("userData").insertMany(userData, function(err, data){
//         console.log("Inserted data");
//     });
// });


// // Find all documents
// MongoClient.connect(dbURL, function(err, db) {
//     if(err) throw err;
//     let dbo = db.db(dbName);        // Create the database object of the actual database inside our mongo server

//     // Get all the database entries in userData collection
//     dbo.collection("userData").find({}).toArray(function(err, data){
//         if(err) throw err;

//         // We call the result "data" to prevent confusion
//         //console.log(data);
//         // db.close();
//     });
// });

//Get user data 
app.get('/api/users', (req, res) => {

    MongoClient.connect(dbURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);

        // Find users
        dbo.collection("userData").find({}).toArray(function(err, data) {
            if (err) throw err;
            res.send(data);
            console.log(data);
        });

    });
});

//Create new user
app.post('/api/user', function(req, res) {
    MongoClient.connect(dbURL, function(err, db){
        if(err) throw err;
        var dbo = db.db(dbName);

        let newUser = {
            "name": req.body.name,
            "pwd": req.body.pwd,
            "role": req.body.role
        }

        dbo.collection("userData").insertOne(newUser, function(err, data) {
            if(err) throw err;
            console.log(data);
            res.send(true);
        })

    });
});

//Delete a user
app.delete('/api/user/:id', function(req, res) {
    MongoClient.connect(dbURL, function(err, db){
        if(err) throw err;
        let ObjectID = require('mongodb').ObjectID;
        let id = ObjectID(req.params.id)
        let query = {
            _id: id
        }

        let dbo = db.db(dbName);
        dbo.collection("userData").deleteOne(query, function(err, data) {
            if(err) throw err;
            res.send(true);
        });

    });
})

//Update user
app.put('/api/user/:id', function (req, res) {

    MongoClient.connect(dbURL, function(err, db){
        if(err) throw err;
        let ObjectID = require('mongodb').ObjectID;
        let id = ObjectID(req.params.id)
        let query = {
            _id: id
        }

        let newValues = {
            $set: {
                name: req.body.name,
                role: req.body.role
            }
        }

        let dbo = db.db(dbName);
        dbo.collection("userData").update(query, newValues, function(err, data){
            if(err) throw err;
            //console.log(data);
            res.send(true);
        });

    });
})

//Get group data 
app.get('/api/groups', (req, res) => {

    MongoClient.connect(dbURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);

        // Find users
        dbo.collection("groupData").find({}).toArray(function(err, data) {
            if (err) throw err;
            res.send(data);
            console.log(data);
        });

    });
});

//Create new group
app.post('/api/group', function(req, res) {
    MongoClient.connect(dbURL, function(err, db){
        if(err) throw err;
        var dbo = db.db(dbName);

        let newGroup = {
            "groupname": req.body.groupname,
            "admin": req.body.admin
        }

        dbo.collection("groupData").insertOne(newGroup, function(err, data) {
            if(err) throw err;
            console.log(data);
            res.send(true);
        })

    });
});