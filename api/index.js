require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;

// middleware
app.use(require("cors")({ credentials: true, origin: true }));
app.use(express.json());
app.use(require("cookie-parser")());

// routes

app.get("/", (req, res) => {
  res.send("<h1>Employees API</h1>");
});
app.use("/", require("./routes/auth.route"));

// app.use(verifyJWT);
app.use("/users", require("./routes/user.route"));
app.use("/employees", require("./routes/employee.route"));

// 404 and error handling
app.all("*", require("./middleware/404.middleware"));
app.use(require("./middleware/errorHandling.middleware"));

// server listening

const start = async () => {
  try {
    console.log("Connecting to the DB...");
    await require("mongoose").connect(process.env.MONGO_URI);
    console.log("Connected to the DB!");
    app.listen(PORT, console.log(`Server is live on Port: ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
};
start();
