const express = require('express');
const router = express.Router();

const {
  getStats,
  getTopHabits
} = require('../../state/habits');

// GET /api/stats?userId=123
router.get('/', (req, res) => {
  const userId = Number(req.query.userId);
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const stats = getStats(userId);
  const topHabits = getTopHabits(userId);

  res.json({
    ...stats,
    topHabits
  });
});

module.exports = router;
