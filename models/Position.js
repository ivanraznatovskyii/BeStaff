const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  category: {
    reference: 'categories',
    type: Schema.Types.ObjectId
  },
  user: {
    reference: 'users',
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('positions', positionSchema);