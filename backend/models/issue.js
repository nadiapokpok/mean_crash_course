const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const Issue = new Schema ({
  title: {
    type: String,
  },
  responsible: {
    type: String,
  },
  file: {
    type: String,
  },
  description: {
    type: String,
  },
  severity: {
    type: String,
  },
  status: {
    type: String,
    default: 'open',
  },
});

module.exports = mongoose.model ('Issue', Issue);
