const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  username: { type: String, required: true },
  boss1: { type: String, required: true },
  gear1: { type: String, required: true },
  boss2: { type: String, required: true },
  gear2: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Form', formSchema);
