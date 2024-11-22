require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // Ensure this points to your User model file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('✅ Database connected successfully.');

    // Specify the Discord ID of the user you want to update
    const discordId = '404824652939132979';
    console.log('🔍 Searching for user with Discord ID:', discordId);

    try {
      // Find the user in the database
      let user = await User.findOne({ discord_id: discordId });

      if (!user) {
        console.log('❌ No user found with Discord ID:', discordId);
      } else {
        console.log('✅ User found:', user);

        // Update the is_admin flag
        user.is_admin = true;

        // Save the updated user to the database
        const updatedUser = await user.save();
        console.log('✅ User updated successfully:', updatedUser);

        process.exit(0); // Exit the script after success
      }
    } catch (error) {
      console.error('❌ Error during user update:', error.message);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  });
