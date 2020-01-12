const mongoose = require("mongoose");
const { hasher, comparePassword } = require("pcypher");
//we can use bcrypt for password hashing

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    profileImageUrl: {
      type: String
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
      }
    ]
  },
  {
    timestamps: true
  }
);

//hooks
userSchema.pre("save", async function(next) {
  try {
    console.log("this keyword: ", this);
    if (!this.isModified("password")) {
      return next();
    }
    //let hashedPassword = await bcrypt.hash(this.password, 10);
    let hashedPassword = await hasher(this.password);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

//helper function
//an instance method
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    //let isMatch = await bcrypt.compare(candidatePassword, this.password);
    let isMatch = await comparePassword(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

//module.exports = mongoose.model('User', userSchema);
const User = mongoose.model("User", userSchema);

module.exports = User;
