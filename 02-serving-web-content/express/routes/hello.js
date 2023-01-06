const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const greeting = 'greeting' in req.query
    ? req.query.greeting
    : 'Hello';
  res.render('hello', { greeting });
});

module.exports = router;
