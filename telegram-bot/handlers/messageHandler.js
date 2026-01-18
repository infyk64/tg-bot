const { sendMenu } = require('../ui/menu');
const {
  addHabit,
  completeHabit,
  getHabitsForToday,
  deleteHabit,
  getStats,
  getTopHabits
} = require('../state/habits');
const {
  getUserState,
  setUserState,
  clearUserState
} = require('../state/userState');

/**
 * Формирует текст и inline-клавиатуру привычек
 */
function renderHabitsMessage(habits) {
  const { done, undone } = habits;

  if (!done.length && !undone.length) {
    return {
      text: 'У тебя пока нет привычек 👀',
      keyboard: []
    };
  }

  let text = '';

  if (undone.length) {
    text += '🟢 Сегодня не выполнены:\n';
    undone.forEach((h, i) => {
      text += `${i + 1}. ⬜ ${h.title}\n`;
    });
    text += '\n';
  }

  if (done.length) {
    text += '✅ Уже выполнены сегодня:\n';
    done.forEach(h => {
      text += `• ${h.title} 🔥 ${h.streak}\n`;
    });
  }

  const keyboard = [];

  undone.forEach(h => {
    keyboard.push([
      { text: '✅ Выполнено', callback_data: `done_${h.id}` },
      { text: '🗑 Удалить', callback_data: `delete_${h.id}` }
    ]);
  });

  done.forEach(h => {
    keyboard.push([
      { text: '🗑 Удалить', callback_data: `delete_${h.id}` }
    ]);
  });

  return { text, keyboard };
}

module.exports = (bot) => {

  // ====== TEXT MESSAGES ======
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text) return;

    console.log('MESSAGE:', text);

    // ====== COMMANDS ======
    if (text === '/start') {
      sendMenu(bot, chatId, 'Привет! Я трекер привычек 👋');
      return;
    }

    if (text === '/menu') {
      sendMenu(bot, chatId);
      return;
    }

    // ====== MENU BUTTONS ======
    if (text === '➕ Добавить привычку') {
      setUserState(chatId, 'adding_habit');
      sendMenu(bot, chatId, 'Введите название привычки:');
      return;
    }

    if (text === '📋 Мои привычки') {
      const habits = getHabitsForToday(chatId);
      const { text: messageText, keyboard } = renderHabitsMessage(habits);

      bot.sendMessage(chatId, messageText, {
        reply_markup: { inline_keyboard: keyboard }
      });

      return;
    }

    if (text === '📊 Статистика') {
      const stats = getStats(chatId);
      const topHabits = getTopHabits(chatId);

      let message = `📊 Статистика\n\n`;
      message += `📌 Всего привычек: ${stats.totalHabits}\n`;
      message += `✅ Выполнено сегодня: ${stats.completedToday}\n`;
      message += `🔥 Лучшая серия: ${stats.bestStreak}\n`;
      message += `🏁 Всего выполнений: ${stats.totalCompleted}\n`;

      if (topHabits.length) {
        message += `🏆 Топ привычек:\n`;
        topHabits.forEach((h, i) => {
          message += `${i + 1}. ${h.title} - 🔥 ${h.streak}\n`;
        });
      } else {
        message += `Пока нет данных для рейтинга`;
      }

      bot.sendMessage(chatId, message);
      return;
    }

    // ====== STATES ======
    const state = getUserState(chatId);

    if (state === 'adding_habit') {
      if (!text || text.startsWith('/')) {
        sendMenu(bot, chatId, 'Введите название привычки текстом');
        return;
      }

      addHabit(chatId, text);
      clearUserState(chatId);
      sendMenu(bot, chatId, 'Привычка добавлена ✅');
      return;
    }
  });

  // ====== INLINE BUTTONS ======
  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const data = query.data;

    if (data.startsWith('done_')) {
      const habitId = Number(data.replace('done_', ''));
      completeHabit(chatId, habitId);
    }

    if (data.startsWith('delete_')) {
      const habitId = Number(data.replace('delete_', ''));
      deleteHabit(chatId, habitId);
    }

    const habits = getHabitsForToday(chatId);
    const { text, keyboard } = renderHabitsMessage(habits);

    bot.editMessageText(text, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: { inline_keyboard: keyboard }
    });

    bot.answerCallbackQuery(query.id);
  });

};
