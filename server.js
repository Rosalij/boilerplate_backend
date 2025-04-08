const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
//reads form data


app.set("view engine", "ejs"); //engine = EJS
app.use(express.static("public")); //static files in "public"
app.use(bodyParser.urlencoded({ extended: true }));

//course list array
const courseList = [];

//route
app.get("/", (req, res) => {
    res.render("showcourses", { courseList });
});



app.get("/about", (req, res) => {
    res.render("about");
});



app.post("/addcourses", (req, res) => {

    let newName = req.body.coursename
    let newCode = req.body.coursecode
    let newSyllabus = req.body.syllabus
    let newProgression = req.body.progression
    console.log(newName, newCode, newSyllabus, newProgression)
    //insert into array
    courseList.push({
        name: newName,
        coursecode: newCode,
        syllabus: newSyllabus,
        progression: newProgression
    }); res.render("addcourses");
});



app.get("/addcourses", (req, res) => {

    res.render("addcourses")
});

//starta
app.listen(port, () => {
    console.log("server started on port:" + port);
});