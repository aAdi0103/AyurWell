// routes/sleep.js
const express = require('express');
const router = express.Router();

router.get('/sleep-data', (req, res) => {
  res.json([
    { date: '2025-04-15', hours: 6 },
    { date: '2025-04-16', hours: 7 },
    { date: '2025-04-17', hours: 5 },
    { date: '2025-04-18', hours: 8 },
    { date: '2025-04-19', hours: 6.5 },
    { date: '2025-04-20', hours: 7.2 },
    { date: '2025-04-21', hours: 6.8 },
  ]);
});

module.exports = router;
