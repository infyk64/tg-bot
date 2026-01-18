const db = require('../db/db');

function today() {
  return new Date().toISOString().slice(0, 10);
}

function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// =========================
// ADD HABIT
// =========================
function addHabit(userId, title) {
  db.prepare(`
    INSERT INTO habits (user_id, title, created_at, streak)
    VALUES (?, ?, ?, 0)
  `).run(userId, title, today());
}

// =========================
// DELETE HABIT
// =========================

function deleteHabit(userId, habitId) {
  db.prepare(`
    DELETE FROM habits
    WHERE id = ? AND user_id = ?
  `).run(habitId, userId);
}


// =========================
// GET HABITS FOR TODAY
// =========================
function getHabitsForToday(userId) {
  const habits = db.prepare(`
    SELECT *
    FROM habits
    WHERE user_id = ?
    ORDER BY id ASC
  `).all(userId);

  const done = [];
  const undone = [];

  const todayDate = today();

  for (const habit of habits) {
    if (habit.last_done === todayDate) {
      done.push(habit);
    } else {
      undone.push(habit);
    }
  }

  return { done, undone };
}

// =========================
// COMPLETE HABIT
// =========================
function completeHabit(userId, habitId) {
  const habit = db.prepare(`
    SELECT *
    FROM habits
    WHERE id = ? AND user_id = ?
  `).get(habitId, userId);

  if (!habit) return;

  // уже отмечено сегодня — ничего не делаем
  if (habit.last_done === today()) {
    return;
  }

  let newStreak = 1;

  if (habit.last_done === yesterday()) {
    newStreak = habit.streak + 1;
  }

  db.prepare(`
    UPDATE habits
    SET streak = ?, last_done = ?
    WHERE id = ?
  `).run(newStreak, today(), habitId);
}

// функция статистики
function getStats(userId) {
  const todayDate = today();
  const totalHabits = db.prepare(`
    SELECT COUNT(*) as count
    FROM habits
    WHERE user_id = ?
    `).get(userId).count;


    const completedToday = db.prepare(`
      SELECT COUNT(*) as count
      FROM habits
      WHERE user_id = ?
      AND last_done = ?
      `).get(userId, todayDate).count;

      const bestStreakRow = db.prepare(`
        SELECT MAX(streak) as max
        FROM habits
        WHERE user_id = ?
        `).get(userId);

      const bestStreak = bestStreakRow.max || 0;

      const totalCompleted = db.prepare(`
        SELECT COUNT(*) as count
        FROM habits
        WHERE user_id = ?
        AND last_done IS NOT NULL
        `).get(userId).count;

        return {
          totalHabits,
          completedToday,
          bestStreak,
          totalCompleted
        };
}

function getTopHabits(userId, limit = 5) {
    return db.prepare (`
      SELECT title, streak
      FROM habits
      WHERE user_id = ?
      ORDER BY streak DESC
      LIMIT ?
      `).all(userId, limit);
  }

module.exports = {
  addHabit,
  getHabitsForToday,
  completeHabit,
  deleteHabit,
  getStats,
  getTopHabits
};
