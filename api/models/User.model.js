const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

UserSchema.pre("save", async function () {
  if (this.isNew) {
    let salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  }
});

UserSchema.methods.createAccessToken = function () {
  return jwt.sign(
    { username: this.username, roles: this.roles },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );
};
UserSchema.methods.createRefreshToken = function () {
  return jwt.sign(
    { username: this.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
};

module.exports = model("User", UserSchema);
