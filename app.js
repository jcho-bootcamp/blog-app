const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/blog-app", { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE / MODEL CONFIG
let blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

let Blog = mongoose.model("Blog", blogSchema);


// RESTFUL ROUTES




app.listen(3000, () => console.log("Server is Listening on Port : 3000"));