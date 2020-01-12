const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
//useMongoClient: true, //use if mongoose version installed is v4 and below
mongoose.connect("//string url connection for mongoose", {
  keepAlive: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//bundling
module.exports.User = require("./user");
module.exports.Message = require("./message");
