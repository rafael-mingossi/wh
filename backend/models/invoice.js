const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
  invoiceItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InvoiceItem',
      //required: true,
    },
  ],
  invoiceNumber: {
    type: Number,
  },
  invoiceAmount: {
    type: Number,
  },
  invoiceDate: {
    type: Date,
    default: Date.now,
  },
  //add in the future USER, so Luz can know which user sent
  //add in the future, BILL TO, in case there is more than one receiver
});

exports.Invoice = mongoose.model('Invoice', invoiceSchema);
// exports.invoiceSchema = invoiceSchema;
