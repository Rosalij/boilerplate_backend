

// connection settings  
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const port = process.env.PORT || 3000;
const db = new sqlite3.Database("./db/courses.db");

app.set("view engine", "ejs"); //engine = EJS
app.use(express.static("public")); //static files in "public"
app.use(bodyParser.urlencoded({ extended: true }));


//routing
app.get("/", (req, res) => {
    db.all("SELECT * FROM courses ORDER BY id DESC;", (err, rows) => {
        if (err) {
            console.error(err.message);
        }

        res.render("showcourses", {
            error: "",
            rows: rows,
            saved: ""
        });
    });
});



app.get("/about", (req, res) => {
    res.render("about", {
        error: "",
        saved: ""
    });
});

app.get("/addcourses", (req, res) => {
    res.render("addcourses", {
        error: "",
        saved: ""
    });
});

//save new course 
app.post("/addcourses", (req, res) => {

    let newName = req.body.coursename;
    let newCode = req.body.coursecode;
    let newSyllabus = req.body.syllabus;
    let newProgression = req.body.progression;
    let error = "";
    let saved = "";

    if (newName != "" && newCode != "" && newSyllabus != "" && newProgression != "") {
        //store if correct
        const stmt = db.prepare("INSERT INTO courses(coursename, coursecode, syllabus, progression)VALUES(?, ?, ?, ?);");
        stmt.run(newName, newCode, newSyllabus, newProgression);
        stmt.finalize();
        saved = "Your course has been saved to 'Your Courses'."
    } else {// id fields are incorrect
        error = "Error - Please fill in every field";
    }
 

    res.render("addcourses", {
        error: error,
        saved
    }
    );
});

//delete a course
app.get("/delete/:id", (req, res) => {
    let id = req.params.id;

    db.run("DELETE FROM courses WHERE id=?;", id, (err) => {
        if (err) {
            console.error(err.message)
        }
        //redirect
        res.redirect("/");

    });
});


//start application 
app.listen(port, () => {
    console.log("Application started on port: " + port);
});