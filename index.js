const Discord = require('discord.js');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => GatewayIntentBits[a]),
});

const twitchStreamLink = 'https://www.twitch.tv/ahmed5102morocco'; // Remplacez par votre lien Twitch

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`[36m%s[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

client.once('ready', () => {
  console.log(`[36m%s[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`[36m%s[0m`, `|    ✨HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`[36m%s[0m`, `|    ❤️WELCOME TO 2024`);

  client.user.setPresence({
    activities: [{
      name: 'Streaming on Twitch',
      type: ActivityType.Streaming,
      url: twitchStreamLink,
    }],
    status: 'online', // Vous pouvez également utiliser 'idle' ou 'dnd' pour les statuts "away" ou "do not disturb"
  }).catch(console.error);

  setInterval(() => {
    client.user.setPresence({
      activities: [{
        name: 'Streaming on Twitch',
        type: ActivityType.Streaming,
        url: twitchStreamLink,
      }],
      status: 'online', // Vous pouvez également utiliser 'idle' ou 'dnd' pour les statuts "away" ou "do not disturb"
    }).catch(console.error);
  }, 10000); // Met à jour le statut toutes les 10 secondes
});

login();
