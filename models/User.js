const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
});

userSchema.methods.getSpecificFields = function() {
  return {
    _id: this._id,
    username: this.username
  };
}

module.exports = mongoose.model("User", userSchema);
