const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add a new transaction
router.post('/', async (req, res) => {
  const { amount, category, note } = req.body;
  const result = sentiment.analyze(note);

  try {
    const newTransaction = new Transaction({
      amount,
      category,
      note,
      sentiment: result.score
    });

    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
