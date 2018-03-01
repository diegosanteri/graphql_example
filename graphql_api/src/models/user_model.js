const crypto = require("crypto");
const mongoose = require("mongoose");
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt"));

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String
});

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword) {
    return bcrypt.compareAsync(candidatePassword, this.password);
}

module.exports = mongoose.model("user", UserSchema);