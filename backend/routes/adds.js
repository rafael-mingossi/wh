const { Add } = require('../models/add');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const inputsList = await Add.find();

  if (!inputsList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(inputsList);
});

router.get('/invoiceids', async (req, res) => {
  const inputsList = await Add.find();

  const filterOpen = inputsList
    .filter((filt) => filt.status === 'open')
    .map((el) => el);

  const arr = filterOpen.map((value) => value._id); //gera 1 array com 3 items

  //console.log(arr);

  if (!arr) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(arr);
});

router.get('/amounts', async (req, res) => {
  const inputsList = await Add.find();

  const filterOpen = inputsList
    .filter((filt) => filt.status === 'open')
    .map((el) => el);

  const arr = filterOpen.map((value) => value.totalAmount);

  //console.log(arr);

  if (!arr) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(arr);
});

router.get('/:id', async (req, res) => {
  const input = await Add.findById(req.params.id);

  if (!input) {
    res.status(500).json({ message: 'No input for the selected ID' });
  }
  res.status(200).send(input);
});

router.post('/', async (req, res) => {
  let inputs = new Add({
    rateDay: req.body.rateDay,
    date: req.body.date,
    startTime: req.body.startTime,
    finishTime: req.body.finishTime,
    location: req.body.location,
    child: req.body.child,
    totalHours: req.body.totalHours,
    totalAmount: req.body.totalAmount,
    comments: req.body.comments,
  });

  inputs = await inputs.save();

  //this conditional is to wait for the data to come from DB before render
  if (!inputs) {
    return res.status(500).send('The input cannot be added');
  } else {
    res.send(inputs);
  }
});

router.put('/update', (req, res) => {
  Add.findByIdAndUpdate(req.body.id, {
    rateDay: req.body.rateDay,
    date: req.body.date,
    startTime: req.body.startTime,
    finishTime: req.body.finishTime,
    location: req.body.location,
    child: req.body.child,
    totalHours: req.body.totalHours,
    totalAmount: req.body.totalAmount,
    comments: req.body.comments,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.put('/:id', async (req, res) => {
  const input = await Add.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!input) {
    return res.status(500).send('The status cannot be updated');
  } else {
    res.send(input);
  }
});

router.post('/all', async (req, res) => {
  const input = await Add.updateMany({}, { $set: { status: 'closed' } });
  //console.log(input);

  if (!input) {
    return res.status(500).send('The status cannot be updated');
  } else {
    res.send(input);
  }
});

router.delete('/:id', (req, res) => {
  Add.findByIdAndRemove(req.params.id)
    .then((input) => {
      if (input) {
        return res
          .status(200)
          .json({ success: true, message: 'item has been deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'item not found' });
      }
    })
    .catch((error) => {
      //db connection error
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
