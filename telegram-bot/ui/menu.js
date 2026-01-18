function sendMenu(bot, chatId, text = 'Выбери действие:') {
  bot.sendMessage(chatId, text, {
    reply_markup: {
      keyboard: [
        [{ text: '➕ Добавить привычку' }],
        [{ text: '📋 Мои привычки' }],
        [{ text: '📊 Статистика' }],
        [{
          text: '📱 Открыть приложение',
          web_app: {
            url: process.env.WEB_APP_URL
          }
        }]
      ],
      resize_keyboard: true
    }
  });
}

module.exports = { sendMenu };
