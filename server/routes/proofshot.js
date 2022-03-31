const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const proofShotCtl = require('../controller/proofshot');
// /api/proofshot

// 인증페이지 - 인증페이지 조회
router.get('/:challengeId/auth', authMiddleware, proofShotCtl.authProofshot);

// 인증페이지 - 인증 완료 (업로드).
router.post('/:challengeId/proof', authMiddleware, proofShotCtl.uploadProofshot);

// 인증페이지 - 인증 완료 (업로드).
router.patch('/:proofshotId', authMiddleware, proofShotCtl.modifyProofshot);

module.exports = router;
