// Loading server packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("express-handlebars");
const { mongoDbUrl, PORT, globalVariables } = require("./config/configurations");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");


// Database Connetor
mongoose
  .connect(mongoDbUrl)
  .then((response) => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.log("Database connection error.");
  });

// Initializng application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap-icons")));
app.use(
  session({
    secret: "aapmsweb",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.use(globalVariables);
app.engine("handlebars", hbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configuring Method Override
app.use(methodOverride('action'));

// Configuring Routers
const mainRouter = require("./routers/mainRouter");
const adminRouter = require("./routers/adminRouter");
app.use("/", mainRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
