const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Challenge = require('../models/challenge');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth-middleware');


router.get('/challenge', authMiddleware,async (req, res) => {
    let { user } = res.locals;
    user = await user.populate('participate','title _id participants thumbnail startAt');
    console.log(user);
});

module.exports = router;