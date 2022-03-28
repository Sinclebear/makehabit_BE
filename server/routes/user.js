const express = require('express');
const router = express.Router();
const passport = require('passport');
const userCtl = require('../controller/user');
const authCtl = require('../controller/auth');
const authMiddleware = require('../middlewares/auth-middleware');
// /api/users

// 회원가입 API
router.post('/signup', userCtl.signup);

// 로그인 API
router.post('/login', userCtl.login);

//checkEmail
router.post('/checkEmail', userCtl.checkEmail);

router.post('/checkNickname', userCtl.checkNickname);

router.get('/checkLogin', authMiddleware, userCtl.checkLogin);
router.get('/callUserRanking', authMiddleware, userCtl.callUserRanking);

router.get('/kakao', passport.authenticate('kakao')); // https 붙이면 연결시켜봅시다
router.get('/kakao/callback', authCtl.kakaoCallback);

module.exports = router;
