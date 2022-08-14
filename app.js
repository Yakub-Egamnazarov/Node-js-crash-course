const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// Connect to MONGO DB

const dbURI =
  "mongodb+srv://Yakub-user1:JJDSuneq1KgLi4DI@nodetuts.cseco.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to DB...");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine
app.set("view engine", "ejs"); // will be used to EJS templates

// listen for requests
// app.listen(3000);

// middleware & static public files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Basic Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// BLOG ROUTES
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});
