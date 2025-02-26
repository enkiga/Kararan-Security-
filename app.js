const express = require("express");
const app = express();
const path = require("path");

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware for working hours
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 23) {
    next();
  } else {
    res.send(
      "The web application is only available during working hours (Monday to Friday, 9 AM to 5 PM)"
    );
  }
});

// Routes
app.get("/", (req, res) => res.render("home"));
app.get("/services", (req, res) => res.render("services"));
app.get("/contact", (req, res) => res.render("contact"));

module.exports = app;
