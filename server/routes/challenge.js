const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const challengeCtl = require('../controller/challenge');
//api

// 추천 API
router.get('/main/recommendation', authMiddleware, challengeCtl.recommendChallenge);

//메인 - 검색기능
router.get('/search', authMiddleware, challengeCtl.searchChallenge);

// 카테고리 페이지 목록조회
router.get('/category/:categoryId', authMiddleware, challengeCtl.getCategoryList);

// 상세조회 API
router.get('/challenges/:challengeId', authMiddleware, challengeCtl.getDetailChallenge);

//챌린지 작성 API 기능 구현 완료
router.post('/challenges', authMiddleware, challengeCtl.writeChallenge);

//챌린지 수정 API
router.put('/challenges/:challengeId', authMiddleware, challengeCtl.changeChallenge);

// 챌린지 참여하기 기능 구현 완료
router.post('/challenges/:challengeId/join', authMiddleware, challengeCtl.joinChallenge);

// 챌린지 참여취소 기능 구현 완료
router.delete('/challenges/:challengeId/join', authMiddleware, challengeCtl.joinCancelChallenge);

//찜하기 기능 구현 완료
router.post('/challenges/:challengeId/like', authMiddleware, challengeCtl.likeChallenge);

// 찜하기 취소 기능 구현 완료
router.delete('/challenges/:challengeId/like', authMiddleware, challengeCtl.likeCancelChallenge);

module.exports = router;
