require('dotenv').config({ path: '.env.bot' });

const TelegramBot = require('node-telegram-bot-api');
const messageHandler = require('./handlers/messageHandler');

console.log('BOT_TOKEN =', process.env.BOT_TOKEN);
console.log('WEB_APP_URL =', process.env.WEB_APP_URL);

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

messageHandler(bot);

console.log('🤖 Бот запущен');

bot.on('polling_error', (error) => {
  console.error('POLLING ERROR:', error?.response?.body || error);
});
