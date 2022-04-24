const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const myPageCtl = require('../controller/mypage');
// /api/mypage

//내가 참여중인 첼린지 모아보기
router.get('/challenge', authMiddleware, myPageCtl.getMyChallenge);

// 좋아요 모아보기. 시안이 안나와서, 우선 챌린지 보기와 거의 동일하게 작성. calcIsLike만 추가.
router.get('/like', authMiddleware, myPageCtl.getMyLikeChallenge);

//내 인증샷 모아보기
router.get('/proofShot', authMiddleware, myPageCtl.getMyProofShot);

router.get('/proofShot/:proofShotId', authMiddleware, myPageCtl.getDetailProofShot);

//캐릭터 정보 조회 API
router.get('/character', authMiddleware, myPageCtl.getCharacterInfo);

//나의 총 인증횟수, 챌린지 참가 수 조회 API
router.get('/userinfo', authMiddleware, myPageCtl.getUserInfo);

module.exports = router;
