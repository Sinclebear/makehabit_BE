const express = require('express');
const router = express.Router();
const ProofShot = require('../models/proofShot');
const Challenge = require('../models/challenge');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth-middleware');
const upload = require('../modules/multer');

// 인증페이지 - 인증페이지 조회 (챌린지 상세페이지 조회와 동일. 필요한 요소만 뽑아서 보내도록 수정.)
router.get('/:challengeId/auth', authMiddleware, async (req, res) => {
    let { user } = res.locals;
    const { challengeId } = req.params;
    let userLikes;
    if (user.userId) {
        const existUser = await User.findOne({ _id: user.userId });
        userLikes = existUser.likes;
    }
    console.log(userLikes);
    const challenge = await Challenge.findById(challengeId).lean();
    console.log(challenge);
    // 참가회수
    const joinPeople = challenge.participants;
    challenge['participants'] = joinPeople.length;
    // round
    const start = challenge.startAt;
    const cur = new Date().toLocaleDateString();
    const end = new Date(cur);
    const dateDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    if (dateDiff < 0) {
        challenge['round'] = '라운드 시작 전입니다.';
    } else {
        challenge['round'] = Math.ceil((dateDiff + 1) / 3);
    }
    console.log(joinPeople);
    if (user.userId) {
        console.log(joinPeople, userLikes);
        if (joinPeople.includes(user.userId)) {
            challenge['isParticipate'] = true;
        } else {
            challenge['isParticipate'] = false;
        }
        if (userLikes.includes(challengeId)) {
            challenge['isLike'] = true;
        } else {
            challenge['isLike'] = false;
        }
        // 로그인한 유저의 참여여부
        // 로그인한 유저의 좋아요여부
    } else {
        challenge['isLike'] = false;
        challenge['isParticipate'] = false;
        challenge['isUpload'] = false;
        challenge['proofCount'] = false;
    }

    res.status(200).json(challenge);
});

// 인증페이지 - 인증 완료 (업로드). 작성 필요
router.post('/:challengeId/proof', authMiddleware, async (req, res) => {
    res.status(200).json({});
});

module.exports = router;
