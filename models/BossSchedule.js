const mongoose = require('mongoose');

const bossScheduleSchema = new mongoose.Schema({
  start_date: { type: Date, required: true },
  slot: { type: String, required: true },
  bosses: { type: [String], required: true }  // This is an array of strings (boss names)
});

module.exports = mongoose.model('BossSchedule', bossScheduleSchema);
