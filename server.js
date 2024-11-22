const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./db'); // MongoDB connection
const Form = require('./models/Form'); // Import Form model
const User = require('./models/User'); // Import User model
const BossSchedule = require('./models/BossSchedule'); // Import BossSchedule model
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

const processedCodes = new Set(); // Track used codes
app.post('/callback', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    console.error('❌ No authorization code received.');
    return res.status(400).json({ error: 'Authorization code is missing.' });
  }

  console.log('✅ Authorization code received:', code);

  if (processedCodes.has(code)) {
    console.warn('⚠️ Duplicate authorization code received:', code);
    return res.status(400).json({ error: 'Authorization code has already been used.' });
  }

  try {
    console.log('⏳ Processing authorization code:', code);

    const params = new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI,
    });

    const tokenResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    console.log('✅ Token response from Discord:', tokenResponse.data);

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log('✅ User data from Discord API:', userResponse.data);

    processedCodes.add(code); // Mark code as used
    res.json(userResponse.data);
  } catch (error) {
    console.error('❌ Error processing authorization code:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to authenticate' });
  }
});


// Server-side (e.g., in server.js)
app.post('/submit-form', async (req, res) => {
  const { username, boss1, gear1, boss2, gear2 } = req.body;

  if (!username || !boss1 || !gear1 || !boss2 || !gear2) {
    return res.status(400).json({ error: 'Please fill out all fields.' });
  }

  try {
    // Check if the user already has a submission
    const existingForm = await Form.findOne({ username });

    if (existingForm) {
      // If the user already has a form, delete the old one
      await Form.deleteOne({ username });
    }

    // Save the new form submission
    const newForm = new Form({ username, boss1, gear1, boss2, gear2 });
    const savedForm = await newForm.save();

    res.status(201).json({ message: 'Form submitted successfully!', data: savedForm });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit the form.' });
  }
});



app.post('/add-boss-schedule', async (req, res) => {
  const { bosses, startDate, timeSlot } = req.body;

  // Check if required fields are populated
  if (!startDate || !timeSlot || !Array.isArray(bosses) || bosses.length === 0) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Create a new schedule entry with multiple bosses
    const newBossSchedule = new BossSchedule({
      start_date: startDate,
      slot: timeSlot,
      bosses: bosses  // Pass the array of bosses
    });

    await newBossSchedule.save();
    res.status(201).json({ message: 'Bosses scheduled successfully!' });
  } catch (error) {
    console.error('Error adding bosses to schedule:', error);
    res.status(500).json({ error: 'Failed to schedule bosses.' });
  }
});




// Check Admin Status Endpoint
app.post('/check-admin', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    // Fetch user from database (example using MongoDB)
    const user = await User.findOne({ discord_id: userId });

    if (!user) {
      return res.status(404).json({ isAdmin: false });
    }

    res.json({ isAdmin: user.is_admin || false });
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({ error: 'Failed to check admin status.' });
  }
});

app.get('/admin-responses', async (req, res) => {
  try {
    const responses = await Form.find({});
    res.json(responses);
  } catch (error) {
    console.error('Error fetching admin responses:', error);
    res.status(500).json({ error: 'Failed to fetch responses.' });
  }
});

app.get('/get-schedule', async (req, res) => {
  try {
    // Fetch the schedules (from BossSchedule collection)
    const schedules = await BossSchedule.find(); // You might need to adjust this based on your actual data model

    res.json(schedules); // Respond with JSON data
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ error: 'Failed to fetch schedule.' });
  }
});

// Assuming you're using Express
app.get('/forms/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const formData = await Form.findOne({ username });  // Replace 'Form' with your actual model
    if (!formData) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(formData);
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ error: 'Failed to fetch form data' });
  }
});

// Assuming you are using MongoDB and Mongoose

app.get('/admin-boss-statistics', async (req, res) => {
  try {
    const submissions = await Form.find(); // Assuming 'Form' is where the submissions are stored

    // Initialize an object to hold selection counts
    const selectionCounts = {};

    // Count selections for each boss
    submissions.forEach(submission => {
      [submission.boss1, submission.boss2].forEach(boss => {
        if (boss) {
          selectionCounts[boss] = (selectionCounts[boss] || 0) + 1;
        }
      });
    });

    // Convert the selectionCounts object to an array for easier front-end rendering
    const stats = Object.entries(selectionCounts).map(([boss, count]) => ({
      boss,
      count,
    }));

    res.json(stats); // Send the aggregated data
  } catch (error) {
    console.error('Error fetching boss selection statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Backend route to get user data based on username
app.get('/users/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user); // Return the user data as a response
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Backend route to update user data
app.put('/users/:username', async (req, res) => {
  const { username } = req.params;
  const { primary_weapon, secondary_weapon, gear_score } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's weapons and gear score
    user.primary_weapon = primary_weapon;
    user.secondary_weapon = secondary_weapon;
    user.gear_score = gear_score;

    await user.save(); // Save the updated user data

    res.json(user); // Send back the updated user data
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Failed to update user data' });
  }
});

app.delete('/delete-scheduled-event/:eventId', async (req, res) => {
  const { eventId } = req.params;
  try {
    await Event.deleteOne({ _id: eventId }); // MongoDB or your DB removal logic
    res.json({ message: 'Event successfully deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});




// Start the server
app.listen(3001, () => {
  console.log('🚀 Server running on http://localhost:3001');
});
