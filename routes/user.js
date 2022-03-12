const express = require('express');
const router = express.Router();
const passport = require('passport');
const userCtl = require('../controller/user');
const authCtl = require('../controller/auth');
const authMiddleware = require('../middlewares/auth-middleware');
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *    summary: "회원 가입"
 *    description: "회원가입 api"
 *    tags: [Users]
 *    requestBody:
 *      description: 회원가입
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: "이메일"
 *              nickname:
 *                type: string
 *                description: "닉네임"
 *              password:
 *                type: string
 *                description: "패스워드"
 *              confirmPassword:
 *                type: string
 *                description: "패스워드 확인"
 *    responses:
 *      "200":
 *        description: 회원가입 성공 시
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */

// 회원가입 API
router.post('/signup', userCtl.signup);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *    summary: "로그인"
 *    description: "로그인 api"
 *    tags: [Users]
 *    requestBody:
 *      description: 로그인
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: "이메일"
 *              password:
 *                type: string
 *                description: "패스워드"
 *    responses:
 *      "200":
 *        description: 로그인 성공 시
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                email:
 *                  type: string
 *                message:
 *                  type: string
 *
 */
// 로그인 API
router.post('/login', userCtl.login);

/**
 * @swagger
 * /api/users/checkEmail:
 *   post:
 *    summary: "이메일 양식체크, 중복체크"
 *    description: "이메일 양식체크, 중복체크"
 *    tags: [Users]
 *    requestBody:
 *      description: 이메일 양식체크, 중복체크
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: "이메일"
 *    responses:
 *      "200":
 *        description: 양식체크 성공 시
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */
//checkEmail
router.post('/checkEmail', userCtl.checkEmail);

/**
 * @swagger
 * /api/users/checkNickname:
 *   post:
 *    summary: "닉네임 양식체크, 중복체크"
 *    description: "닉네임 양식체크, 중복체크"
 *    tags: [Users]
 *    requestBody:
 *      description: 닉네임 양식체크, 중복체크
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              nickname:
 *                type: string
 *                description: "닉네임"
 *    responses:
 *      "200":
 *        description: 양식체크 성공 시
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */
router.post('/checkNickname', userCtl.checkNickname);

/**
 * @swagger
 * /api/users/checkLogin:
 *   get:
 *    summary: "로그인 유저 정보 받아오기"
 *    description: "로그인 유저 정보 받아오기"
 *    tags: [Users]
 *    responses:
 *      "200":
 *        description: 유저 정보 받아오기 성공 시
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                nickname:
 *                  type: string
 */
router.get('/checkLogin', authMiddleware, userCtl.checkLogin);

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', authCtl.kakaoCallback);

module.exports = router;
