require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const app = express();
const serverPort = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

//routes
app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/api", require("./routes/index"));
app.use("/api/auth", require("./routes/auth"));
app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  require("./routes/messages")
);

app.get("/api/messages", loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({
        created: "desc"
      })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

//getting ready for production & serving front end
//use to deploy in heroku, etc....
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/, (req, res) => res.send(__dirname + "/public/index.html"));
}

app.listen(serverPort, () => console.log(`running on port: ${serverPort}`));
