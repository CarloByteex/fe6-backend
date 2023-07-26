const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  place: {
    type: String
  },
  cv: {
    type: String,
    required: true
  },
  certification: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  },
  sales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sale',
    },
  ]
});

const Client = mongoose.model('client', clientSchema);

module.exports = Client;