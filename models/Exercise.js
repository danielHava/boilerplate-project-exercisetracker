const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

exerciseSchema.methods.getSpecificFields = function() {
  return {
    description: this.description,
    duration: this.duration,
    date: this.date
  };
}

module.exports = mongoose.model("Exercise", exerciseSchema);
