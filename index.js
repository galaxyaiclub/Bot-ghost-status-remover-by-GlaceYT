const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();
const express = require('express');

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => GatewayIntentBits[a]),
});

const twitchStreamLink = 'https://www.twitch.tv/ahmed5102morocco'; // Replace with your Twitch link

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStreamingStatus() {
  client.user.setPresence({
    activities: [{
      name: 'Streaming on Twitch',
      type: ActivityType.Streaming,
      url: twitchStreamLink,
    }],
    status: 'online',
  }).then(() => {
    console.log('Streaming status updated successfully.');
  }).catch((error) => {
    console.error('Failed to update streaming status:', error);
  });
}

// Express App
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! This is your Discord bot.');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await login();
    updateStreamingStatus();
    setInterval(updateStreamingStatus, 10000); // Update the status every 10 seconds
  } catch (error) {
    console.error('Error starting bot:', error);
    process.exit(1);
  }
});
