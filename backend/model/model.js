const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
  class: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  details: {
    type: String,
    required: false
  },
  ismedicinal: {
    type: Boolean,
    required: true
  }
});

const historyItemSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  response: {
    type: responseSchema,
    required: true
  },
  feedback :{
    type:String,
    required: false
  }
}, { timestamps: true });

const HistoryItem = mongoose.model('HistoryItem', historyItemSchema);

module.exports = HistoryItem;
