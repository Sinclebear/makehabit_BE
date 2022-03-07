const express = require('express');
const router = express.Router();
const ProofShot = require('../models/proofShot');
const Challenge = require('../models/challenge');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth-middleware');
// const upload = require('../modules/multer');

// 인증페이지 - 인증페이지 조회 (챌린지 상세페이지 조회와 동일. 필요한 요소만 뽑아서 보내도록 수정.)
router.get('/:challengeId/auth', authMiddleware, async (req, res) => {
    try {
        let { user } = res.locals;
        // 비로그인 사용자 처리
        if (user === undefined) {
            return res.status(401).json({ message: '로그인 후 사용 가능합니다.' });
        }
        const { challengeId } = req.params;
        // let userLikes;
        // if (user) {
        //     // 유저값이 있는 경우
        //     const existUser = await User.findOne({ _id: user.userId });
        //     userLikes = existUser.likes;
        // }
        // console.log(userLikes);
        const challenge = await Challenge.findById(challengeId).lean();
        // console.log(challenge);

        // 참가회수? 참가자 목록 불러오기 아닌가?
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
        // console.log(joinPeople);
        // if (user.userId) {
        //     console.log(joinPeople, userLikes);
        //     if (joinPeople.includes(user.userId)) {
        //         challenge['isParticipate'] = true;
        //     } else {
        //         challenge['isParticipate'] = false;
        //     }
        //     if (userLikes.includes(challengeId)) {
        //         challenge['isLike'] = true;
        //     } else {
        //         challenge['isLike'] = false;
        //     }
        //     // 로그인한 유저의 참여여부
        //     // 로그인한 유저의 좋아요여부
        // } else {
        //     challenge['isLike'] = false;
        //     challenge['isParticipate'] = false;
        //     challenge['isUpload'] = false;
        //     challenge['proofCount'] = false;
        // }
        return res.status(200).json(challenge);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
});

// 인증페이지 - 인증 완료 (업로드). 작성 필요
router.post('/:challengeId/proof', authMiddleware, async (req, res) => {
    try {
        let { user } = res.locals;
        // console.log(user);
        // console.log(user.userId);

        // 비로그인 사용자 처리
        if (user === undefined) {
            return res.status(401).json({ message: '로그인 후 사용 가능합니다.' });
        }
        // proofshot 테이블을 userId로 먼저 조회해서,
        // "오늘 날짜로" 올린 게시글이 있는경우, 400에러.
        // 근데 오늘 날짜, 오늘 챌린지Id로 올린 사용자가, 애초에 여기로 접근이 아예 안되야되지 않나.
        // 한번 더 걸러줘야되나?
        const { challengeId } = req.params;
        let today = new Date();
        let today_date = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ).toISOString(); // 오늘 날짜 00시를 기준으로 ISOString 으로 변환.

        // 오늘 00시 이후에 등록한 인증샷이 있는지 조회.
        const todayProofshot = await ProofShot.find({
            userId: user.userId,
            challengeId,
            createdAt: { $gte: today_date },
        });
        //console.log(todayProofshot);

        // 오늘 00시 이후 등록한 인증샷이 있는 경우, 400 에러 발생 후 튕겨내기.
        if (todayProofshot.length > 0) {
            res.status(400).json({ message: '오늘 이 챌린지에 이미 인증한 내역이 있습니다.' });
        } else {
            let { imgUrl, challengeTitle, comment } = req.body;
            const createProofshot = await ProofShot.create({
                challengeId,
                userId: user.userId,
                challengeTitle,
                imgUrl,
                comment,
            });
            return res.status(201).json({ message: '인증샷 등록이 완료되었습니다.' });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
});

module.exports = router;
