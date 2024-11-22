require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // Ensure this points to your User model file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('✅ Database connected successfully.');

    // Specify the Discord ID of the user you want to delete
    const discordId = '404824652939132979';
    console.log('🔍 Searching and deleting user with Discord ID:', discordId);

    try {
      // Find and delete the user
      const deletedUser = await User.findOneAndDelete({ discord_id: discordId });

      if (!deletedUser) {
        console.log('❌ No user found with Discord ID:', discordId);
      } else {
        console.log('✅ User deleted successfully:', deletedUser);
      }

      process.exit(0); // Exit the script
    } catch (error) {
      console.error('❌ Error during user deletion:', error.message);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  });
