const { Invoice } = require('../models/invoice');
const { InvoiceItem } = require('../models/invoiceItem');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const invoiceList = await Invoice.find()
    .populate({ path: 'invoiceItems', populate: 'items' })
    .sort({ invoiceDate: -1 });

  if (!invoiceList) {
    res.status(500).json({ success: false });
  }
  res.send(invoiceList);
});

router.get('/lastinvoice', async (req, res) => {
  const lastInvoice = await Invoice.find()
    .populate({ path: 'invoiceItems', populate: 'items' })
    .sort({ invoiceDate: -1 })
    .limit(1);

  if (!lastInvoice) {
    res.status(500).json({ success: false });
  }
  res.send(lastInvoice);
});

router.get('/numbers', async (req, res) => {
  const invoiceListNum = await Invoice.find()
    .sort({ invoiceDate: -1 })
    .limit(1);
  const invNum = invoiceListNum.map((val) => {
    return val.invoiceNumber;
  });

  //console.log(invoiceListNum);

  if (!invNum) {
    res.status(500).json({ success: false });
  }
  res.send(invNum);
});

router.get(`/:id`, async (req, res) => {
  const invoiceList = await Invoice.findById(req.params.id).populate({
    path: 'invoiceItems',
    populate: 'items',
  });

  if (!invoiceList) {
    res.status(500).json({ success: false });
  }
  res.send(invoiceList);
});

router.post('/', async (req, res) => {
  const num = await Invoice.findOne({ invoiceNumber: req.body.invoiceNumber });

  if (num) {
    res.status(400).send('Invoice Number already exists');
  } else {
    //this will loop through the days added to that invoice and get the details
    //using Promise.all to resolve the first promise pending error
    const invoiceItemsIds = Promise.all(
      req.body.invoiceItems.map(async (invoiceItem) => {
        //console.log(invoiceItem);

        let newInvoiceItem = new InvoiceItem({
          items: invoiceItem.items,
        });

        newInvoiceItem = await newInvoiceItem.save();
        //console.log(newInvoiceItem);
        //return only the ids from that inputs
        return newInvoiceItem._id;
      })
    );

    //to fix the second pending promise
    const invoiceItemsIdsPromise = await invoiceItemsIds;
    //console.log(invoiceItemsIds);
    //console.log(invoiceItemsIdsPromise);

    //calculate the total of the invoice
    await Promise.all(
      invoiceItemsIdsPromise.map(async (invoiceItemId) => {
        const invoiceItem = await InvoiceItem.findById(invoiceItemId).populate(
          'items',
          'totalAmount'
        );
        //console.log(invoiceItem); //objeto com total amount e ids items e id da invoice
        //console.log(invoiceItemId); //retorna [id] id

        const newArray = invoiceItem.items.map((el) => {
          return el.totalAmount;
        });
        //console.log(newArray); //ta vindo array com 3 valores
        const totalAmount = newArray.reduce((a, b) => a + b, 0);
        //console.log(totalAmount);

        let invoice = new Invoice({
          invoiceItems: invoiceItemsIdsPromise,
          invoiceNumber: req.body.invoiceNumber,
          invoiceAmount: totalAmount,
          invoiceDate: req.body.invoiceDate,
          user: req.body.user,
        });

        invoice = await invoice.save();

        if (!invoice) {
          return res.status(400).send('The invoice cannot be created');
        }

        res.send(invoice);
      })
    );
  }
});

// router.post('/', async (req, res) => {
//   //this will loop through the days added to that invoice and get the details
//   //using Promise.all to resolve the first promise pending error
//   const invoiceItemsIds = Promise.all(
//     req.body.invoiceItems.map(async (invoiceItem) => {
//       //invoiceItem will return { items: '61404c1558d8e55878c88d46' } coming from user input
//       let newInvoiceItem = new InvoiceItem({
//         items: invoiceItem.items,
//       });
//       //newInvoiceItem will return { _id: 6143e17f98abda59603a4407, items: 61404c1558d8e55878c88d46 }
//       console.log(newInvoiceItem);
//       newInvoiceItem = await newInvoiceItem.save();

//       //return only the ids from that inputs
//       return newInvoiceItem._id;
//     })
//   );

//   //to fix the second pending promise
//   const invoiceItemsIdsPromise = await invoiceItemsIds;

//   //calculate the total of the invoice
//   const invoiceAmounts = await Promise.all(
//     invoiceItemsIdsPromise.map(async (invoiceItemId) => {
//       const invoiceItem = await InvoiceItem.findById(invoiceItemId).populate(
//         'items',
//         'totalAmount'
//       );
//       const totalAmount = invoiceItem.items.totalAmount++;
//       return totalAmount;
//     })
//   );

//   const totalAmount = invoiceAmounts.reduce((a, b) => a + b, 0);

//   let invoice = new Invoice({
//     invoiceItems: invoiceItemsIdsPromise,
//     invoiceNumber: req.body.invoiceNumber,
//     invoiceAmount: totalAmount,
//     invoiceDate: req.body.invoiceDate,
//   });

//   //invoice = await invoice.save();

//   if (!invoice) {
//     return res.status(400).send('The invoice cannot be created');
//   }

//   res.send(invoice);
// });

router.delete('/:id', (req, res) => {
  Invoice.findByIdAndRemove(req.params.id)
    .then(async (invoice) => {
      if (invoice) {
        await invoice.invoiceItems.map(async (invoiceItem) => {
          await InvoiceItem.findByIdAndRemove(invoiceItem);
        });
        return res
          .status(200)
          .json({ success: true, message: 'the invoice was deleted!' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'invoice not found!' });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

//get the invoices by user ID
router.get('/userinvoices/:userid', async (req, res) => {
  const userInvoices = await Invoice.find({ user: req.params.userid })
    .populate({ path: 'invoiceItems', populate: 'items' })
    .sort({ invoiceDate: -1 });

  if (!userInvoices) {
    res.status(500).json({ success: false });
  }
  res.send(userInvoices);
});

module.exports = router;
