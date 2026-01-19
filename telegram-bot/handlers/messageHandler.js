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
  const all = [...habits.done, ...habits.undone];
  const completed = habits.done.length;

  if (!all.length) {
    return {
      text: 'Пока нет привычек.\n\nНачни с первой — это займёт 5 секунд.',
      keyboard: [[{ text: '➕ Новая привычка', callback_data: 'add_habit' }]]
    };
  }

  let text = `Сегодня • ${completed} / ${all.length} 🔥\n\n`;

  all.forEach(h => {
    text += `${h.last_done ? '✅' : '⬜'} ${h.title}\n`;
  });

  const keyboard = all.map(h => ([
    { text: '✓', callback_data: `done_${h.id}` },
    { text: '🗑', callback_data: `delete_${h.id}` }
  ]));

  keyboard.push([
    { text: '➕ Новая привычка', callback_data: 'add_habit' },
    { text: '📊 Статистика', callback_data: 'stats' }
  ]);

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
      const habits = getHabitsForToday(chatId);
      const { text: messageText, keyboard } = renderHabitsMessage(habits);
      
      bot.sendMessage(chatId, messageText, {
        reply_markup: { inline_keyboard: keyboard }
      });
      
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
      
      const habits = getHabitsForToday(chatId);
      const { text: messageText, keyboard } = renderHabitsMessage(habits);
      
      bot.sendMessage(chatId, 'Привычка добавлена ✅');
      bot.sendMessage(chatId, messageText, { reply_markup: { inline_keyboard: keyboard }});

      return;
    }
  });

  // ====== INLINE BUTTONS ======
  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const data = query.data;

    if (data === 'add_habit') {
  setUserState(chatId, 'adding_habit');
  bot.sendMessage(chatId, 'Введите название привычки:');
  bot.answerCallbackQuery(query.id);
  return;
}

if (data === 'stats') {
  const stats = getStats(chatId);
  const topHabits = getTopHabits(chatId);

  let message = `📊 Статистика\n\n`;
  message += `Всего привычек: ${stats.totalHabits}\n`;
  message += `Выполнено сегодня: ${stats.completedToday}\n`;
  message += `Лучшая серия: ${stats.bestStreak}\n`;
  message += `Всего выполнений: ${stats.totalCompleted}\n\n`;

  topHabits.forEach((h, i) => {
    message += `${i + 1}. ${h.title} — 🔥 ${h.streak}\n`;
  });

  bot.sendMessage(chatId, message);
  bot.answerCallbackQuery(query.id);
  return;
}

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
