const express = require('express');
const router = express.Router();
const Challenge = require('../models/challenge');
const User = require('../models/user');
const Proofshot = require('../models/proofShot');
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/main/recommendation', async (req, res) => {
    // 챌린지 시작 전인 것만 추천하는 기능 추가
    const { length } = req.query;
    const randomChallenges = await Challenge.aggregate([{ $sample: { size: Number(length) } }]);
    const challenges = randomChallenges.map((item) => {
        //id 바꿔주는 부분
        let challengeId = item._id.toString();
        item['challengeId'] = challengeId;
        //참여인원수 구하는 부분
        item['participants'] = item.participants.length;
        // round 구하는 부분
        let start = item.startAt;
        let cur = new Date().toLocaleDateString(); //2022-03-05........
        let end = new Date(cur); //2022-03-05
        var dateDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        if (dateDiff < 0) {
            item['round'] = '라운드 시작 전입니다.';
            item['status'] = 'before';
        } else if (dateDiff > 30) {
            item['round'] = '라운드 종료 되었습니다.';
            item['status'] = 'complete';
        } else {
            item['round'] = Math.ceil((dateDiff + 1) / 3);
            item['status'] = 'playing';
        }
        return item;
    });
    res.status(200).json({ challenges });
});

//메인 - 검색기능 //주현님 모먼트 !!
router.get('/search', async (req, res) => {
    const { title } = req.query;
    const existChallenges = await Challenge.find(
        { title: { $regex: `${title}` } },
        { _id: 1, participants: 1, thumbnail: 1, title: 1, startAt: 1 }
    ).lean(); // populate.._doc..
    const challenges = existChallenges.map((item) => {
        //id 바꿔주는 부분
        let challengeId = item._id.toString();
        item['challengeId'] = challengeId;
        //참여인원수 구하는 부분
        let joinPeople = item.participants;
        let participants = joinPeople.length;
        item['participants'] = participants;
        // round 구하는 부분
        let start = item.startAt;
        let cur = new Date().toLocaleDateString(); //2022-03-05........
        let end = new Date(cur); //2022-03-05
        var dateDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        if (dateDiff < 0) {
            item['round'] = '라운드 시작 전입니다.';
            item['status'] = 'before';
        } else if (dateDiff > 30) {
            item['round'] = '라운드 종료 되었습니다.';
            item['status'] = 'complete';
        } else {
            item['round'] = Math.ceil((dateDiff + 1) / 3);
            item['status'] = 'playing';
        }
        return item;
    });
    res.status(200).json({ challenges });
});

// 카테고리 페이지 목록조회 // 걱정됐죠 ㅜ.ㅜ
router.get('/category/:categoryId', authMiddleware, async (req, res) => {
    let userId;
    if (!res.locals.user) {
        userId = '';
    } else {
        userId = res.locals.user.userId;
    }
    const { categoryId } = req.params;
    const { length } = req.query;
    let existUser, userLikes;
    if (userId) {
        //populate objectId를 가지고 다시 조회
        //** projection 은 가져올 때부터 특정 필드 가져오는 작업 findById, projection userLikes가져올 수 있다.
        existUser = await User.findById(userId);
        userLikes = existUser.likes;
    }
    const existChallenges = await Challenge.find(
        { category: categoryId },
        { _id: 1, participants: 1, thumbnail: 1, title: 1, startAt: 1 }
    ) // projection으로 대체가능  질문..5개 가져오는 기준?!
        .limit(length)
        .lean();
    const challenges = existChallenges.map((item) => {
        // challengeId 만들어주는 부준
        const challengeId = item._id.toString();
        item['challengeId'] = challengeId;
        // 참여인원수 만들어야함
        const joinPeople = item.participants;
        const participants = joinPeople.length;
        item['participants'] = participants;
        // 회차 만들어야함
        const start = item.startAt;
        const cur = new Date().toLocaleDateString();
        const end = new Date(cur);
        const dateDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        if (dateDiff < 0) {
            item['round'] = '라운드 시작 전입니다.';
            item['status'] = 'before';
        } else if (dateDiff > 30) {
            item['round'] = '라운드 종료 되었습니다.';
            item['status'] = 'complete';
        } else {
            item['round'] = Math.ceil((dateDiff + 1) / 3);
            item['status'] = 'playing';
        }
        // isLike 만드는 부분.
        if (userId) {
            if (userLikes.includes(item.challengeId)) {
                item['isLike'] = true;
            } else {
                item['isLike'] = false;
            }
        } else {
            item['isLike'] = false;
        }
        return item;
    });
    res.status(200).json({ challenges });
});
// 상세조회 API
router.get('/challenges/:challengeId', authMiddleware, async (req, res) => {
    try {
        const { challengeId } = req.params;
        let userId;
        if (!res.locals.user) {
            userId = '';
        } else {
            userId = res.locals.user.userId;
        }
        console.log(userId);
        let userLikes, userParticipate, userProofShot;
        if (userId) {
            console.log(userId, challengeId);
            const existUser = await User.findById(userId);
            userLikes = existUser.likes;
            userParticipate = existUser.participate;
            userProofShot = await Proofshot.find({ challengeId, userId });
        }
        const challenge = await Challenge.findById(challengeId).lean();
        // 참가회수 { }
        const joinPeople = challenge.participants;
        challenge['participants'] = joinPeople.length;
        // round
        const start = challenge.startAt;
        const cur = new Date().toLocaleDateString();
        const end = new Date(cur);
        const dateDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        if (dateDiff < 0) {
            challenge['round'] = '라운드 시작 전입니다.';
            challenge['status'] = 'before';
        } else if (dateDiff > 30) {
            challenge['round'] = '라운드 종료 되었습니다.';
            challenge['status'] = 'complete';
        } else {
            challenge['round'] = Math.ceil((dateDiff + 1) / 3);
            challenge['status'] = 'playing';
        }
        if (userId) {
            // isParticipate가 false이면 isParticiapte false, proofCount 0으로 반환, isUpload false
            //console.log(userId, joinPeople);
            // if (joinPeople.includes(userId)){ 이걸로 하면 왜 안되는지..ㅜ.ㅜ
            if (userParticipate.includes(challengeId)) {
                challenge['isParticipate'] = true;
            } else {
                challenge['isParticipate'] = false;
            }
            if (userLikes.includes(challengeId)) {
                challenge['isLike'] = true;
            } else {
                challenge['isLike'] = false;
            }
            challenge['proofCount'] = userProofShot.length; //수정
            console.log(cur);
            if (userProofShot.length) {
                console.log(userProofShot);
                if (
                    userProofShot.filter((item) => item.createdAt.toLocaleDateString() === cur)
                        .length
                ) {
                    challenge['isUpload'] = true;
                } else {
                    challenge['isUpload'] = false;
                }
            } else {
                challenge['isUpload'] = false;
            }
            // 로그인한 유저의 그날 인증여부
            // 로그인한 유저의 총 인증횟수
        } else {
            challenge['isLike'] = false;
            challenge['isParticipate'] = false;
            challenge['isUpload'] = false;
            challenge['proofCount'] = 0;
        }
        res.status(200).send(challenge);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

//챌린지 작성 API 기능 구현 완료
router.post('/challenges', authMiddleware, async (req, res) => {
    try {
        if (!res.locals.user) {
            res.status(401).send({
                errorMessage: '로그인 후 사용하시오',
            });
            return;
        }
        const { userId } = res.locals.user;
        const { title, content, category, thumbnail, startAt, howtoContent } = req.body;
        const participants = [userId];
        const existUser = await User.findById(userId);
        const participate = existUser.participate;
        const createdChallenge = await Challenge.create({
            title,
            content,
            category,
            thumbnail,
            startAt,
            howtoContent,
            participants,
        });
        const challengeId = createdChallenge.challengeId;
        participate.push(challengeId);
        await User.updateOne({ _id: userId }, { $set: { participate } });
        res.status(201).json({ message: '챌린지 작성이 완료되었습니다.' }); // created : 201
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

// 챌린지 참여하기 기능 구현 완료
router.post('/challenges/:challengeId/join', authMiddleware, async (req, res) => {
    //일단 challengeId로 조회해야함
    if (!res.locals.user) {
        res.status(401).send({
            message: '로그인 후 사용하시오',
        });
        return;
    }
    const { userId } = res.locals.user;
    const { challengeId } = req.params;
    const existChallenge = await Challenge.findById(challengeId);
    const participants = existChallenge.participants;
    const existUser = await User.findById(userId);
    const participate = existUser.participate;
    if (!participants.includes(userId)) {
        participants.push(userId);
        await Challenge.updateOne({ _id: challengeId }, { $set: { participants } });
        if (!participate.includes(challengeId)) {
            participate.push(challengeId);
            await User.updateOne({ _id: userId }, { $set: { participate } });
        }
        res.status(201).json({ message: '참여성공' });
    } else {
        res.status(400).json({ message: '참여실패' });
    }
});

// 챌린지 참여취소 기능 구현 완료
router.delete('/challenges/:challengeId/join', authMiddleware, async (req, res) => {
    if (!res.locals.user) {
        res.status(401).send({
            message: '로그인 후 사용하시오',
        });
        return;
    }
    const { userId } = res.locals.user;
    const { challengeId } = req.params;
    const existChallenge = await Challenge.findById(challengeId);
    const participants = existChallenge.participants;
    const existUser = await User.findById(userId);
    const participate = existUser.participate;
    if (participants.includes(userId)) {
        participants.splice(participants.indexOf(userId), 1);
        await Challenge.updateOne({ _id: challengeId }, { $set: { participants } });
        if (participate.includes(challengeId)) {
            participate.splice(participate.indexOf(challengeId), 1);
            await User.updateOne({ _id: userId }, { $set: { participate } });
        }
        res.status(200).json({ message: '참여 취소 성공' });
    } else {
        res.status(400).json({ message: '참여 취소 실패' });
    }
});

//찜하기 기능 구현 완료
router.post('/challenges/:challengeId/like', authMiddleware, async (req, res) => {
    if (!res.locals.user) {
        res.status(401).send({
            message: '로그인 후 사용하시오',
        });
        return;
    }
    const { userId } = res.locals.user;
    const { challengeId } = req.params;
    const existUser = await User.findById(userId);
    const existLikes = existUser.likes;
    if (!existLikes.includes(challengeId)) {
        existLikes.push(challengeId);
        await User.updateOne({ _id: userId }, { $set: { likes: existLikes } });
        res.status(201).json({ message: '찜하기 성공' });
    } else {
        res.status(400).json({ message: '찜하기 실패' });
    }
});

// 찜하기 취소 기능 구현 완료
router.delete('/challenges/:challengeId/like', authMiddleware, async (req, res) => {
    if (!res.locals.user) {
        res.status(401).send({
            message: '로그인 후 사용하시오',
        });
        return;
    }
    const { userId } = res.locals.user;
    const { challengeId } = req.params;
    const existUser = await User.findById(userId);
    const existLikes = existUser.likes;
    if (existLikes.includes(challengeId)) {
        existLikes.splice(existLikes.indexOf(challengeId), 1);
        await User.updateOne({ _id: userId }, { $set: { likes: existLikes } });
        res.status(200).json({ message: '찜하기 취소 성공' });
    } else {
        res.status(400).json({ message: '찜하기 취소 실패' });
    }
});

module.exports = router;
