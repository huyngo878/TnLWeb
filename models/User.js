const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  discord_id: { type: String, required: true, unique: true }, // Discord ID
  username: { type: String, required: true }, // Username
  avatar: { type: String }, // Avatar URL (optional)
  gear_score: { type: Number, default: 0 }, // Default gear score
  primary_weapon: { type: String, default: 'Unassigned' }, // Default primary weapon
  secondary_weapon: { type: String, default: 'Unassigned' }, // Default secondary weapon
  is_admin: { type: Boolean, default: false }, // Admin flag
});

// Export the User model with explicit collection name
module.exports = mongoose.model('User', userSchema, 'users'); // Explicitly bind to 'users' collection
