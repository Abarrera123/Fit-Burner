const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const router = require("./routes/apiRoutes.js");

const PORT = process.env.PORT || 3000
const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// routes
app.use(router);
app.use(require('./routes/htmlRoutes.js'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
