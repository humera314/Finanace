const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  note: { type: String, required: true },
  date: { type: Date, default: Date.now },
  sentiment: { type: Number, default: 0 }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
