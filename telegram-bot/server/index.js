require('dotenv').config({ path: '.env.server' });

const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.SERVER_PORT || 3001;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/habits', require('./routes/habits'));
app.use('/api/stats', require('./routes/stats'));

// health check
app.get('/', (req, res) => {
  res.send('🚀 Habit Tracker API is running');
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
