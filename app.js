const express = require("express");
const morgan = require("morgan");

// Express app
const app = express();

// register view engine
app.set("view engine", "ejs");

// Listen for requests
app.listen(3000);

// Creating custom middleware
app.use((req, res, next) => {
  console.log("new request made:");
  console.log("host: ", req.hostname);
  console.log("path: ", req.url);
  console.log("method: ", req.method);
  console.log("--- --- --- ---");
  next(); // to continue the server to move on
});

app.get("/", (req, res) => {
  const blogs = [
    { title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet. " },
    {
      title: "Mario finds starts",
      snippet: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur.",
    },
  ];
  res.render("index", { title: "Home", blogs: blogs });
});
app.use((req, res, next) => {
  console.log("rendering ABOUT page");
  next();
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new BLOG" });
});

// 404 page
// middleware function
app.use((req, res) => {
  res.status(404).render("404", { title: "404 Error" });
});
