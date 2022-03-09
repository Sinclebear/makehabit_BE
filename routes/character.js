const express = require('express');
const router = express.Router();
const Challenge = require('../models/challenge');
const User = require('../models/user');
const Proofshot = require('../models/proofShot');
const Character = require('../models/character');
const Item = require('../models/item');
const authMiddleware = require('../middlewares/auth-middleware');
const calc = require('../modules/calcProperty');
const moment = require('moment');

router.get('/', (req, res) => {
    res.send('연결확인');
});

module.exports = router;
