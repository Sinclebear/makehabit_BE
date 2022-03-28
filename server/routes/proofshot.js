const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const proofShotCtl = require('../controller/proofshot');
// /api/proofshot

// 인증페이지 - 인증페이지 조회 (챌린지 상세페이지 조회와 동일. 필요한 요소만 뽑아서 보내도록 수정.)
router.get('/:challengeId/auth', authMiddleware, proofShotCtl.authProofshot);

// 인증페이지 - 인증 완료 (업로드). 작성 필요
router.post('/:challengeId/proof', authMiddleware, proofShotCtl.uploadProofshot);

module.exports = router;
