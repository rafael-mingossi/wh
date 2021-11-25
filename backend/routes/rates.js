const { Rate } = require('../models/rate');
const express = require('express');
const router = express.Router(); //middleware

router.get('/:userId', async (req, res) => {
  try {
    const rateList = await Rate.find();
    //res.status(200).send(rateList);

    const userId = req.params.userId;

    //filter by current user
    if (userId) {
      const userRates = rateList.filter((rate) => rate.user == userId);

      if (!userRates) {
        res.status(500).json({ success: false });
      }
      res.status(200).send(userRates);
    } else {
      res.status(500).json({ message: 'user not found' });
    }
  } catch (err) {
    console.error(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const rate = await Rate.findById(req.params.id);

    if (!rate) {
      res.status(500).json({ message: 'No rate for the ID selected' });
    }
    res.status(200).send(rate);
  } catch (err) {
    console.error(err);
  }
});

router.post(`/`, async (req, res) => {
  try {
    let rate = new Rate({
      day: req.body.day,
      value: req.body.value,
      user: req.body.user,
    });

    rate = await rate.save(); //this will save/create a new categr=ory

    //this conditional is to wait for the data to come from DB before render
    if (!rate) {
      return res.status(404).send('The rate cannot be created');
    } else {
      res.send(rate);
    }
  } catch (err) {
    console.log(err);
  }
});

// router.post('/', async (req, res) => {
//   const checkRate = await Rate.findOne({
//     day: req.body.day,
//   });

//   if (!checkRate) {
//     return res.status(400).send('Rate not found');
//   }

//   //validating Rates to not leting them accept double entry
//   if (checkRate) {
//     if (
//       checkRate.day === 'Saturday' ||
//       checkRate.day === 'Sunday' ||
//       checkRate.day === 'Weekday' ||
//       checkRate.day === 'Public Holiday'
//     ) {
//       res.status(400).send('The rate exists');
//     }
//   } else {
//     let rate = new Rate({
//       day: req.body.day,
//       value: req.body.value,
//     });

//     rate = await rate.save();

//     if (!rate) {
//       return res.status(404).send('The rate cannot be created');
//     } else {
//       res.status(200).send(rate);
//     }
//   }

//   //console.log(checkRate.day);
// });

router.delete('/:id', (req, res) => {
  Rate.findByIdAndRemove(req.params.id)
    .then((rate) => {
      if (rate) {
        return res
          .status(200)
          .json({ success: true, message: 'rate has been deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'rate not found' });
      }
    })
    .catch((error) => {
      //db connection error
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
