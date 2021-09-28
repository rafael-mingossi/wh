const mongoose = require('mongoose');

const invoiceItemSchema = mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Add',
      //required: true,
    },
  ],
  // date: {
  //   type: String,
  // },
  // child: {
  //   type: String,
  // },
  // hours: {
  //   type: Number,
  // },
  // totalAmount: {
  //   type: Number,
  // },
});

exports.InvoiceItem = mongoose.model('InvoiceItem', invoiceItemSchema);
// exports.invoiceItemSchema = invoiceItemSchema;
