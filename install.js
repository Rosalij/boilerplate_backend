//install script

const sqlite3 = require("sqlite3").verbose();

//create database Courses
const db = new sqlite3.Database("./db/courses.db");

//create table (id, coursename, coursecode, syllabus, progression)
db.serialize(() => {
    db.run("DROP TABLE IF EXISTS courses;*");

    db.run(`CREATE TABLE courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coursename TEXT NOT NULL,
        coursecode TEXT NOT NULL,
        syllabus TEXT NOT NULL,
        progression TEXT NOT NULL
        );
    `);
});

db.close();