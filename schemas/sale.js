const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  customerName: {
    type: String,
    required: true,
    trim:true
  },
  companyName: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  contactNumber: {
    type: String,
    required: true,
  },
  GSTNumber: {
    type: String,
    required: true,
  },
  requireService: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  orderValue: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "Inactive"
  },
  incenStatus: {
    type: String,
    default: "Pending"
  },
  incenValue: {
    type: Number,
    default: 0
  },
  remarks: {
    type: String,
    default: ""
  }
});

const Sale = mongoose.model('sale', saleSchema);

module.exports = Sale;