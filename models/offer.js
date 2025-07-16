const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: String,
  bankName: String,
  discountAmount: Number,
  minTransactionAmount: Number,
  paymentInstruments: [String],
  offerCode: String,
  validity: {
    start: Date,
    end: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);