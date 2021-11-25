const mongoose = require('mongoose');

const invoiceItemSchema = mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Add',
      //required: true,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

exports.InvoiceItem = mongoose.model('InvoiceItem', invoiceItemSchema);
// exports.invoiceItemSchema = invoiceItemSchema;
