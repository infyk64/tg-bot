const express = require('express');
const router = express.Router();

const {
  addHabit,
  getHabitsForToday,
  completeHabit,
  deleteHabit
} = require('../../state/habits');

// GET /api/habits?userId=123
router.get('/', (req, res) => {
  const userId = Number(req.query.userId);
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const habits = getHabitsForToday(userId);
  res.json(habits);
});

// POST /api/habits
router.post('/', (req, res) => {
  const { userId, title } = req.body;

  if (!userId || !title) {
    return res.status(400).json({ error: 'userId and title are required' });
  }

  addHabit(Number(userId), title);
  res.json({ success: true });
});

// POST /api/habits/:id/done
router.post('/:id/done', (req, res) => {
  const habitId = Number(req.params.id);
  const { userId } = req.body;

  completeHabit(Number(userId), habitId);
  res.json({ success: true });
});

// DELETE /api/habits/:id
router.delete('/:id', (req, res) => {
  const habitId = Number(req.params.id);
  const { userId } = req.body;

  deleteHabit(Number(userId), habitId);
  res.json({ success: true });
});

module.exports = router;
