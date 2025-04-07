const express = require("express");
const app = express();
const port = 3000;


app.set("view engine", "ejs"); //engine = EJS
app.use(express.static("public")); //static files in "public"
//route
app.get("/", (req, res) => {
    res.send("Hello World!")
});

//starta
app.listen(port, () => {console.log("server started on port:" + port);
});