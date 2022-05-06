const express = require('express');
var router  = express.Router();
const bodyParser = require('body-parser');
var {Course} = require('../models/CourseModel');
const { User} = require("../models/UserModel");
const {AreaOfInterest} = require("../models/areaOfInterestModel");
// const app = require('./UserController');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.post('/usercourse', (req,res) => {
    var course = new Course({
        // courseid: Course.find().count()+1,
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        author: req.body.author,
        category: req.body.category.replace(/\s+/g, '').toLowerCase(),
        price: req.body.price,
        contents: req.body.contents,
        courseincludes: req.body.courseincludes,
        language: req.body.language,
        enrolledstudents: req.body.enrolledstudents,
        reviews: req.body.reviews
    });
    course.save((err,doc) => {
        if(!err) { res.send(doc);
        console.log("Data saved");
     }
        else { 
            console.log('Error in saving data :' + err);
            res.send(err.message);
        }
    });
});

app.get('/usercourse', async (req,res) => {
    Course.find((err,data) => {
        if(!err){
            res.send(data);
        }
        else { console.log("Error in getting data : " + err);}
    });
});

app.get('/usercourse/:courseid', (req,res) => {
    Course.findOne({ userid: req.params.userid },`name description author price`, (err,doc) => {
        if(!err) { res.send(doc);}
        else { console.log("Error in retreiving data")}
    });
});

app.put('/usercourse/:courseid', (req,res) => {
    var course = {
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        category: req.body.category.replace(/\s+/g, '').toLowerCase(),
        price: req.body.price,
        contents: req.body.contents,
        courseincludes: req.body.courseincludes,
        language: req.body.language,
        enrolledstudents: req.body.enrolledstudents,
    };
    Course.findOneAndUpdate({courseid:req.params.courseid}, {$set: course}, {new:true}, (err,doc) => {
        if(!err) {res.send(doc);}
        else {  console.log(`Error in updating user`);}
    });
});

app.delete('/usercourse/:courseid',(req,res) => {
    Course.findOneAndRemove(req.params.userid, (err,doc) => {
        if(!err) { res.send(doc);}
        else { console.log("Error in deleting user");}
    });
});

app.get('/areaofinterestcourse', async (req, res) =>
{
    AreaOfInterest.aggregate([
        {
            $lookup: {
                from: "courses",
                localField: "routerlink",
                foreignField: "category",
                as: "areaofinterest_courses",
            },
        },
    ])
        .then((result) =>
        {
            //console.log(JSON.stringify(result));
            res.send(result);
        })
        .catch((error) =>
        {
            console.log(error);
        });
});

module.exports = app;