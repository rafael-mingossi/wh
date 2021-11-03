const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res, next) => {
  try {
    const userList = await User.find().select('-passwordHash');

    if (!userList) {
      res.status(500).json({ success: false });
    }
    res.send(userList);
  } catch (err) {
    next(err);
  }
});

router.get(`/:id`, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
      res
        .status(500)
        .json({ message: 'The user for the ID used was not found' });
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

router.post(`/`, async (req, res) => {
  let user = new User({
    firstName: req.body.firstName,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    lastName: req.body.lastName,
    isAdmin: req.body.isAdmin,
  });
  user = await user.save().catch((err) => {
    console.log(err);
  });

  if (!user) {
    return res.status(400).send('The user cannot be created');
  } else {
    res.send(user);
  }
});

router.post('/register', async (req, res) => {
  let user = new User({
    firstName: req.body.firstName,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    lastName: req.body.lastName,
    isAdmin: req.body.isAdmin,
  });
  user = await user.save();

  if (!user) return res.status(400).send('the user cannot be created!');

  res.send(user);
});

//verify user for login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  //console.log(user);

  if (!user) {
    return res.status(400).send('User not found');
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    //this will log the user and return the email and token and if its admin or not
    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
      },
      secret, //this will create the token
      { expiresIn: '1w' } //and will expire the login of the user in 1 week
    );

    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send('password is wrong');
  }
});

module.exports = router;
