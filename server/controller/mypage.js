const Proofshot = require('../models/proofShot');
const Character = require('../models/character');
const calc = require('../modules/calcProperty');
const User = require('../models/user');

//내가 참여중인 챌린지 조회
async function getMyChallenge(req, res) {
    let { user } = res.locals;
    let { status } = req.query;

    if (user === undefined) {
        return res.status(401).json({ message: '로그인 후 사용하시오' });
    }

    try {
        user = await User.findOne({ _id: user._id })
            .lean()
            .populate({
                path: 'participate',
                select: {
                    _id: 1,
                    title: 1,
                    content: 1,
                    participants: 1,
                    thumbnail: 1,
                    startAt: 1,
                    madeBy: 1,
                },
            });

        let challenges = user.participate;
        calc.calcParticipants(challenges);
        await calc.calcUserIsUpload(challenges, user._id);
        calc.calcPastDaysAndRound(challenges);
        calc.calcUploadStatus(challenges);
        calc.calcIsHost(challenges, user._id);
        for (let i = 0; i < challenges.length; i++) {
            challenges[i].challengeId = challenges[i]._id;
            if (i != challenges.length - 1)
                challenges[i].thumbnail = challenges[i].thumbnail.replace('origin', 'thumb');
        }
        //status가 undefined 인 경우
        challenges.sort((a, b) => {
            if (b.status === a.status) {
                return a.isUpload - b.isUpload;
            }
            return a.status - b.status;
        });
        if (!status) return res.status(200).json({ challenges });
        else
            return res
                .status(200)
                .json({ challenges: challenges.filter((el) => el.status === +status) });
    } catch (err) {
        return res.status(400).json({ message: '잘못된 요청입니다.' });
    }
}

// 좋아요 모아보기. 시안이 안나와서, 우선 챌린지 보기와 거의 동일하게 작성. calcIsLike만 추가.
async function getMyLikeChallenge(req, res) {
    let { user } = res.locals;
    let { status } = req.query;

    if (user === undefined) {
        return res.status(401).json({ message: '로그인 후 사용하시오' });
    }

    try {
        // console.log(user);
        user = await User.findOne({ _id: user._id })
            .lean()
            .populate({
                path: 'likes',
                select: {
                    _id: 1,
                    title: 1,
                    participants: 1,
                    thumbnail: 1,
                    startAt: 1,
                },
            });
        // console.log(user);

        let raw_challenges = user.likes;
        calc.calcStatus(raw_challenges); // status 필드 추가
        let challenges = raw_challenges.filter((challenge) => {
            return challenge.status === 1; // `시작 전` 상태인 챌린지들만 보여주기
        });
        calc.calcParticipants(challenges); // 참여자 수 필드 추가
        // await calc.calcUserIsUpload(challenges, user.userId);
        // calc.calcPastDaysAndRound(challenges);
        await calc.calcIsLike(challenges, user._id); // 좋아요 필드 추가
        for (const i of challenges) {
            i.challengeId = i._id;
            i.thumbnail = i.thumbnail.replace('origin', 'thumb');
        }

        //status가 undefined 인 경우
        if (!status) return res.status(200).json({ challenges });
        else
            return res
                .status(200)
                .json({ challenges: challenges.filter((x) => x.status === +status) }); // status 순으로 정렬. 추후에 스펙이 바뀐다면.. 유지.
    } catch (err) {
        return res.status(400).json({ message: '잘못된 요청입니다.' });
    }
}

//내 인증샷 모아보기
async function getMyProofShot(req, res) {
    // await Proofshot.create({ChallengeId})
    let { user } = res.locals;
    if (user === undefined) {
        return res.status(401).json({ message: '로그인 후 사용하시오' });
    }

    try {
        let proofShots = await Proofshot.find({ userId: user._id })
            .select({
                _id: 1,
                imgUrl: 1,
                createdAt: 1,
            })
            .lean();

        for (let i = 0; i < proofShots.length; i++) {
            proofShots[i].proofShotId = proofShots[i]._id;
            if (i != proofShots.length - 1) {
                proofShots[i].imgUrl = proofShots[i].imgUrl.replace('origin', 'thumb');
            }
        }

        console.log(proofShots);
        return res.status(200).json({ proofShots });
    } catch (err) {
        return res.status(401).json({ message: '잘못된 요청입니다.' });
    }
}

//내 인증샷 상세보기
async function getDetailProofShot(req, res) {
    let { user } = res.locals;
    if (user === undefined) {
        return res.status(401).json({ message: '로그인 후 사용하시오' });
    }

    try {
        const { proofShotId } = req.params;
        let proofShot = await Proofshot.findOne({
            _id: proofShotId,
            //userId: user.userId,
        }).lean();
        console.log(proofShot);
        proofShot.proofShotId = proofShot._id;
        return res.status(200).json({ proofShot });
    } catch (err) {
        //console.log(err);
        return res.status(400).json({ message: '잘못된 요청입니다.' });
    }
}

//캐릭터 정보 조회 API
async function getCharacterInfo(req, res) {
    let { user } = res.locals;
    if (user === undefined) {
        return res.status(401).json({ message: '로그인 후 사용하시오' });
    }

    // select 시, _id:0, characterId: '$_id' 연산을 하면,
    // _id를 보내지 않고 characterId를 _id값으로 보냄.

    try {
        let [character] = await Character.find({ userId: user._id })
            .select({
                _id: 0,
                characterId: '$_id',
                userId: 1,
                characterCurrentPoint: 1,
                createdAt: 1,
            })
            .lean()
            .populate({
                path: 'equippedItems',
                select: { _id: 0, itemId: '$_id', itemImgUrl: 1 },
            });
        //console.log(user);

        let myUserInfo = await User.findById(user._id);
        character.nickname = myUserInfo.nickname; // character 객체에 `닉네임` 추가
        character.totalParticipateCount = myUserInfo.participate.length; // `총 챌린지 참가 수` 추가
        //console.log(myUserInfo);

        let myProofShots = await Proofshot.find({ userId: user._id });
        character.totalProofCount = myProofShots.length; // `총 인증샷 횟수` 추가
        //console.log(myProofShots);

        //console.log(character);
        return res.status(200).json({ character });
    } catch (err) {
        return res.status(401).json({ message: '잘못된 요청입니다.' });
    }
}

//나의 총 인증횟수, 챌린지 참가 수 조회 API
async function getUserInfo(req, res) {
    let { user } = res.locals;
    if (user === undefined) {
        return res.status(401).json({ message: '로그인 후 사용하시오' });
    }
    try {
        user = await User.findOne({ _id: user._id })
            .select({
                _id: 0,
                userId: '$_id',
                participate: 1,
                proofCnt: 1,
            })
            .lean();
        let participateCnt = user.participate.length;
        user.participateCnt = participateCnt;
        delete user.participate; // 불필요한 user 내 participate property 삭제
        // console.log(user);
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(401).json({ message: '잘못된 요청입니다.' });
    }
}

module.exports = {
    getMyChallenge,
    getMyLikeChallenge,
    getMyProofShot,
    getDetailProofShot,
    getCharacterInfo,
    getUserInfo,
};
