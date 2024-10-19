// src/models/Contact.js
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // This will add createdAt and updatedAt fields automatically
});

module.exports = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
