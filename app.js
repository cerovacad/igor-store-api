const express = require("express");
const path = require("path");

const compression = require("compression");
// const session = require("express-session");
const bodyParser = require("body-parser");
const logger = require("morgan");
// const lusca = require("lusca");
const dotenv = require("dotenv");
// const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
// const passport = require("passport");
// const expressValidator = require("express-validator");
const expressStatusMonitor = require("express-status-monitor");
// const multer = require("multer");

//setup multer middleware
// const upload = multer({ dest: path.join(__dirname, "uploads") });
//call .env file
dotenv.load({ path: ".env" });

//setup controllers
const productsController = require("./controllers/product");

//passport config
// const passportConfig = require('/config/passport');

//initialize express app
const app = express();

//connect to mongodb
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);
mongoose.connection.on("error", err => {
  console.error(err);
  console.log("MongoDB connection error");
  process.exit();
});

//express config
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressValidator());
// app.use(session(sessionConfigObject));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use((req, res, next) => {
//   if (req.path === '/api/upload') {
//     next();
//   } else {
//     lusca.csrf()(req, res, next);
//   }
// });
// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));
// app.disable('x-powered-by');

//setup static filesW
app.use("/static", express.static(path.join(__dirname, "public")));



//routing

app.get("/products", productsController.index);
app.post("/products",productsController.save);




//error handler
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Server Error");
  });
}

//setup port listener
app.listen(8080, () => console.log("listening on port 8080!"));

module.exports = app;
