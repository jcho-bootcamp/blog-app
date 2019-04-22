const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/blog-app", { useNewUrlParser: true });

app.set("view engine", "ejs");
mongoose.set('useFindAndModify', false);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MONGOOSE / MODEL CONFIG
let blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

let Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
//   body: "Hello this is a blog post"
// });

// RESTFUL ROUTES
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log("ERROR");
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

// NEW ROUTE
app.get("/blogs/new", (req, res) => {
  res.render("new");
});

// CREATE ROUTE
app.post("/blogs", (req, res) => {
  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      res.render("/new");
    } else {
      res.redirect("/blogs");
    }
  });
});

// SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

// UPDATE ROUTE
app.put("/blogs/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

// DELETE ROUTE
app.delete("/blogs/:id", (req, res) => {
  // Destroy blog
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      // Redirect
      res.redirect("/blogs");
    }
  });
});

app.listen(3000, () => console.log("Server is Listening on Port : 3000"));