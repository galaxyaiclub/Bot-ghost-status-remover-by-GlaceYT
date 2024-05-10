const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const express = require('express');

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});

const statusMessages = ["streaming", "LOUZA COMMUNITY"];

let currentIndex = 0;
const twitchStreamLink = 'https://www.twitch.tv/ahmed5102morocco'; // Replace with your Twitch stream link
const PORT = process.env.PORT || 4000; // Use the PORT environment variable provided by Render, or default to 4000

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatusAndSendMessages() {
  const currentStatus = statusMessages[currentIndex];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: 'STREAMING', url: twitchStreamLink }],
    status: 'online', // Set status to "online" to see the purple streaming status
  });

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!'); // This endpoint is just for demonstration purposes
});

app.listen(PORT, () => {
  console.log(`Bot is running on port ${PORT}`);
});

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  updateStatusAndSendMessages();

  setInterval(() => {
    updateStatusAndSendMessages();
  }, 10000);
});

login();
