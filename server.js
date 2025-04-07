const express = require("express");
const app = express();
const port = 3000;

//route
app.get("/", (req, res) => {
    res.send("Hello World!")
});

//starta
app.listen(port, () => {console.log("server started on port:" + port);
});