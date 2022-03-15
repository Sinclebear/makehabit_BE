const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const characterCtl = require('../controller/character.js');
// /api/character

// 아이템 조회 API // 이중정렬 도전 얘만하면 잘 수있음..
router.get('/', authMiddleware, characterCtl.getAllItems);

// 아이템 추가 API 해치운듯
router.post('/', authMiddleware, characterCtl.buyOrChangeItem);

module.exports = router;
