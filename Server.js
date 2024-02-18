/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: ____Dikshit ARyal______Student ID: ___122660236____ Date: ___2024-02-17___
*
********************************************************************************/ 

// Import required modules
const express = require("express");
const path = require("path");
const collegeData = require("./collegeData"); // Assuming this is your module for accessing college data

// Initialize Express app
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Define routes
app.use(express.static("public"));

//Routing for the home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

//Routing for the about page
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

//Routing for the HTML demo page
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});

// Route to get all students
app.get("/students", (req, res) => {
    collegeData.getAllStudents()
        .then(students => {
            if (students.length > 0) {
                res.json(students);
            } else {
                res.status(404).json({ message: "no results" });
            }
        })
        .catch(error => {
            console.error("Error getting students:", error);
            res.status(500).json({ message: "Internal server error" });
        });
});

// Route to get TAs
app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then(tas => {
            if (tas.length > 0) {
                res.json(tas);
            } else {
                res.status(404).json({ message: "no results" });
            }
        })
        .catch(error => {
            console.error("Error getting TAs:", error);
            res.status(500).json({ message: "Internal server error" });
        });
});

// Route to get all courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(courses => {
            if (courses.length > 0) {
                res.json(courses);
            } else {
                res.status(404).json({ message: "no results" });
            }
        })
        .catch(error => {
            console.error("Error getting courses:", error);
            res.status(500).json({ message: "Internal server error" });
        });
});

// Route to get a student by student number
app.get("/student/:num", (req, res) => {
    const studentNum = req.params.num;
    collegeData.getStudentByNum(studentNum)
        .then(student => {
            if (student) {
                res.json(student);
            } else {
                res.status(404).json({ message: "Student not found" });
            }
        })
        .catch(error => {
            console.error("Error getting student:", error);
            res.status(500).json({ message: "Internal server error" });
        });
});

// Route to serve HTML files
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
});

// Handle 404 - Route not found
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize college data and start server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("Server started on port", HTTP_PORT);
        });
    })
    .catch(error => {
        console.error("Error initializing college data:", error);
    });
