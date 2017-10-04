const express = require("express");
const bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("port", process.env.PORT || 3000);
console.log("Port: " + process.env.PORT + " Mode:  " + process.env.NODE_ENV);


app.use("/", express.static("./documentation"));

app.listen(app.get("port"), () => {});
