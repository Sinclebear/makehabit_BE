const express = require('express');
const router = express.Router();
const Challenge = require('../models/challenge');
const User = require('../models/user');

//메인 - 검색기능
router.get('/search', async (req, res) => {
    const { title } = req.query;
    const existChallenges = await Challenge.find(
        { title: { $regex: `${title}` } },
        { _id: 1, participants: 1, thumbnail: 1, title: 1, startAt: 1 }
    ).lean();
    const challenges = existChallenges.map((item, index, arr) => {
        //id 바꿔주는 부분
        let challengeId = item._id.toString();
        item['challengeId'] = challengeId;
        //참여인원수 구하는 부분
        let joinPeople = item.participants;
        let participants = joinPeople.length;
        item['participants'] = participants;
        // round 구하는 부분
        let start = item.startAt;
        let cur = new Date().toLocaleDateString();
        let end = new Date(cur);
        var dateDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        if (dateDiff < 0) {
            item['round'] = '라운드 시작 전입니다.';
        } else {
            item['round'] = Math.ceil((dateDiff + 1) / 3);
        }
        return item;
    });
    console.log(challenges);
    res.status(200).json({ challenges });
});

// 카테고리 페이지 목록조회 //body에 userId 담아야..미들웨어 통과 X
router.get('/category/:categoryId', async (req, res) => {
    const { userId } = req.body;
    const { categoryId } = req.params;
    const { length } = req.query;
    let existUser, userLikes;
    if (userId) {
        existUser = await User.findOne({ email: userId });
        userLikes = existUser.likes;
    }
    const existChallenges = await Challenge.find(
        { category: categoryId },
        { _id: 1, participants: 1, thumbnail: 1, title: 1, startAt: 1 }
    )
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
        } else {
            item['round'] = Math.ceil((dateDiff + 1) / 3);
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
        // if(userId && userLikes.includes(item.challengeId)){
        //     item["isLike"] = true
        // } else{
        //     item["isLike"] = false
        // }
        return item;
    });
    res.status(200).json({ challenges });
});

router.get('/challenges/:challengeId', async (req, res) => {
    const { challengeId } = req.params;
    const { userId } = req.body;
    let userLikes;
    if (userId) {
        const existUser = await User.findOne({ email: userId });
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
    if (userId) {
        console.log(joinPeople, userLikes);
        if (joinPeople.includes(userId)) {
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

    res.send(challenge);
});

//챌린지 작성 API //미들웨어 통과시켜야함
router.post('/challenges', async (req, res) => {
    // 로그인 기능 완료 되면 authMiddleware 통과시키기!!
    try {
        //const userId = "1234" // authmiddleware에서 가져올 예정
        const { userId, title, content, category, thumbnail, startAt, howtoContent } = req.body;
        const participants = [userId];
        const existUser = await User.findOne({ email: userId });
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
        await User.updateOne({ email: userId }, { $set: { participate } });
        res.status(201).json({ message: '챌린지 작성이 완료되었습니다.' }); // created : 201
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

// 챌린지 참여하기 기능.. user에서 추가해줘야 되네.. //미들웨어 통과시켜야함
router.post('/challenges/:challengeId/join', async (req, res) => {
    //일단 challengeId로 조회해야함
    const { userId } = req.body; //authmiddleware에서 가져올 예정
    console.log(userId);
    const { challengeId } = req.params;
    const existChallenge = await Challenge.findById(challengeId);
    const participants = existChallenge.participants;
    const existUser = await User.findOne({ email: userId });
    const participate = existUser.participate;
    if (!participants.includes(userId)) {
        participants.push(userId);
        await Challenge.updateOne({ _id: challengeId }, { $set: { participants } });
        if (!participate.includes(challengeId)) {
            participate.push(challengeId);
            await User.updateOne({ email: userId }, { $set: { participate } });
        }
        res.status(201).json({ message: '참여성공' });
    } else {
        res.status(400).json({ message: '참여실패' });
    }
});

// 챌린지 참여취소 기능.. user에서 삭제해줘야 되네.. //미들웨어 통과시켜야함
router.delete('/challenges/:challengeId/join', async (req, res) => {
    //일단 challengeId로 조회해야함
    const { userId } = req.body; //authmiddleware에서 가져올 예정
    console.log(userId);
    const { challengeId } = req.params;
    const existChallenge = await Challenge.findById(challengeId);
    const participants = existChallenge.participants;
    const existUser = await User.findOne({ email: userId });
    const participate = existUser.participate;
    if (participants.includes(userId)) {
        participants.splice(participants.indexOf(userId), 1);
        await Challenge.updateOne({ _id: challengeId }, { $set: { participants } });
        if (participate.includes(challengeId)) {
            participate.splice(participate.indexOf(challengeId), 1);
            await User.updateOne({ email: userId }, { $set: { participate } });
        }
        res.status(200).json({ message: '참여 취소 성공' });
    } else {
        res.status(400).json({ message: '참여 취소 실패' });
    }
});

//찜하기 기능 완성 //미들웨어 통과시켜야함
router.post('/challenges/:challengeId/like', async (req, res) => {
    //일단 challengeId로 조회해야함
    const { userId } = req.body; //authmiddleware에서 가져올 예정
    const { challengeId } = req.params;
    const existUser = await User.findOne({ email: userId });
    const existLikes = existUser.likes;
    if (!existLikes.includes(challengeId)) {
        existLikes.push(challengeId);
        await User.updateOne({ email: userId }, { $set: { likes: existLikes } });
        res.status(201).json({ message: '찜하기 성공' });
    } else {
        res.status(400).json({ message: '찜하기 실패' });
    }
});

// 찜하기 취소 기능 완성 //미들웨어 통과시켜야함
router.delete('/challenges/:challengeId/like', async (req, res) => {
    //일단 challengeId로 조회해야함
    const { userId } = req.body; //authmiddleware에서 가져올 예정
    const { challengeId } = req.params;
    const existUser = await User.findOne({ email: userId });
    const existLikes = existUser.likes;
    if (existLikes.includes(challengeId)) {
        existLikes.splice(existLikes.indexOf(challengeId), 1);
        await User.updateOne({ email: userId }, { $set: { likes: existLikes } });
        res.status(200).json({ message: '찜하기 취소 성공' });
    } else {
        res.status(400).json({ message: '찜하기 취소 실패' });
    }
});

module.exports = router;
