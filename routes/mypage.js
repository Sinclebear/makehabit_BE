const express = require('express');
const router = express.Router();
const Proofshot = require('../models/proofShot');
const Character = require('../models/character');
const Items = require('../models/item');
const authMiddleware = require('../middlewares/auth-middleware');
const calc = require('../modules/calcProperty');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');
/**
 * @swagger
 * /api/mypage/challenge:
 *   get:
 *    summary: "mypage challenge list 불러오기 (하단 인증 탭)"
 *    description: "mypage challenge list 불러오기 (하단 인증 탭)"
 *    tags: [MyPage]
 *    parameters:
 *     - name: status
 *       in: query
 *       description: status of item
 *       schema:
 *         type: integer
 *    responses:
 *      "200":
 *        description: list 불러오기 성공 시
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                challenges:
 *                  type: array
 *                  items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       thumbnail:
 *                         type: string
 *                       startAt:
 *                         type: string
 *                       participants:
 *                         type: integer
 *                       isUpload:
 *                         type: boolean
 *                       round:
 *                         type: integer
 *                       challengeId:
 *                         type: string
 */

router.get('/challenge', authMiddleware, async (req, res) => {
    let { user } = res.locals;
    let { status } = req.query;

    if (user === undefined) {
        return res.status(401).json({ message: '로그인 후 사용하시오' });
    }

    try {
        console.log(user);
        user = await User.findOne({ _id: user._id })
            .lean()
            .populate({
                path: 'participate',
                select: {
                    _id: 0,
                    title: 1,
                    challengeId: '$_id',
                    participants: 1,
                    thumbnail: 1,
                    startAt: 1,
                    content: 1,
                },
            });

        let challenges = user.participate;
        calc.calcParticipants(challenges);
        await calc.calcUserIsUpload(challenges, user.userId);
        calc.calcPastDaysAndRound(challenges);
        calc.calcStatus(challenges);
        //for (const i of challenges) i.challengeId = i._id;
        //status가 undefined 인 경우
        if (!status) return res.status(200).json({ challenges });
        else
            return res
                .status(200)
                .json({ challenges: challenges.filter((x) => x.status === +status) });
    } catch (err) {
        return res.status(400).json({ message: '잘못된 요청입니다.' });
    }
});

// 좋아요 모아보기. 시안이 안나와서, 우선 챌린지 보기와 거의 동일하게 작성. calcIsLike만 추가.
router.get('/like', authMiddleware, async (req, res) => {
    let { user } = res.locals;
    let { status } = req.query;

    if (user === undefined) {
        return res.status(401).json({ message: '로그인 후 사용하시오' });
    }

    try {
        console.log(user);
        user = await User.findOne({ _id: user._id })
            .lean()
            .populate('likes', 'title _id participants thumbnail startAt');

        let challenges = user.likes;
        calc.calcParticipants(challenges);
        await calc.calcUserIsUpload(challenges, user.userId);
        calc.calcPastDaysAndRound(challenges);
        calc.calcStatus(challenges);
        await calc.calcIsLike(challenges, user._id); // 좋아요 내용 추가
        for (const i of challenges) i.challengeId = i._id;

        //status가 undefined 인 경우
        if (!status) return res.status(200).json({ challenges });
        else
            return res
                .status(200)
                .json({ challenges: challenges.filter((x) => x.status === +status) });
    } catch (err) {
        return res.status(400).json({ message: '잘못된 요청입니다.' });
    }
});

/**
 * @swagger
 * /api/mypage/proofShot:
 *   get:
 *    summary: "mypage proofShot list 불러오기"
 *    description: "mypage proofShot list 불러오기"
 *    tags: [MyPage]
 *    responses:
 *      "200":
 *        description: list 불러오기 성공 시
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                proofShots:
 *                  type: array
 *                  items:
 *                     type: object
 *                     properties:
 *                       imgUrl:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       proofShotId:
 *                         type: string
 */
router.get('/proofShot', authMiddleware, async (req, res) => {
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
        for (const i of proofShots) i.proofShotId = i._id;
        console.log(proofShots);
        return res.status(200).json({ proofShots });
    } catch (err) {
        return res.status(401).json({ message: '잘못된 요청입니다.' });
    }
});

/**
 * @swagger
 * /api/mypage/proofShot/{proofShotId}:
 *   get:
 *    summary: "mypage proofShot 상세보기 path 방식"
 *    description: "parameter에 proofShotId 담아서 서버로 보낸다."
 *    tags: [MyPage]
 *    parameters:
 *      - name: proofShotId
 *        in: path
 *        required: true
 *        description: proofShotId from parameter
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: proofShot 상세보기 성공 시
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                proofShot:
 *                  type: object
 *                  properties:
 *                    challengeId:
 *                      type: string
 *                    userId:
 *                      type: string
 *                    imgUrl:
 *                      type: string
 *                    comment:
 *                      type: string
 *                    challengeTitle:
 *                      type: string
 *                    createdAt:
 *                      type: string
 *                    proofShotId:
 *                      type: string
 */
router.get('/proofShot/:proofShotId', authMiddleware, async (req, res) => {
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
});

//캐릭터 정보 조회 API
router.get('/character', authMiddleware, async (req, res) => {
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

        /**
         *
         * nickname, totalProofCount, totalParticipateCount 연산해서 character에 넣어야함.
         */

        return res.status(200).json({ character });
    } catch (err) {
        return res.status(401).json({ message: '잘못된 요청입니다.' });
    }
});

/*
// 아이템, 캐릭터 생성 테스트
router.get('/createtest', authMiddleware, async (req, res) => {
    // 카테고리별 아이템 생성
    // await Items.create({
    //     category: 'color',
    //     categoryItemNum: 1,
    //     itemImgUrl: 'https://cdn.pixabay.com/photo/2016/04/16/10/33/man-1332780_960_720.png',
    //     itemName: '기본 컬러',
    //     price: 0,
    // });

    // await Items.create({
    //     category: 'background',
    //     categoryItemNum: 1,
    //     itemImgUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    //     itemName: '기본 배경',
    //     price: 0,
    // });

    // await Items.create({
    //     category: 'emotion',
    //     categoryItemNum: 1,
    //     itemImgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/13/58/ball-1845546_960_720.jpg',
    //     itemName: '스마일',
    //     price: 0,
    // });

    // await Items.create({
    //     category: 'clothes',
    //     categoryItemNum: 1,
    //     itemImgUrl: 'https://cdn.pixabay.com/photo/2016/03/31/19/21/clothes-1294931_960_720.png',
    //     itemName: '흰색 스웨터',
    //     price: 0,
    // });

    // await Items.create({
    //     category: 'acc',
    //     categoryItemNum: 1,
    //     itemImgUrl: 'https://cdn.pixabay.com/photo/2016/02/29/00/49/red-1227873_960_720.png',
    //     itemName: '빨간 리본',
    //     price: 0,
    // });

    // 임의 캐릭터 추가.
    // await Character.create({
    //     userId: mongoose.Types.ObjectId('6223479ab51335cde2c90ee6'),
    //     characterCurrentPoint: 2000,
    //     equippedItems: [
    //         mongoose.Types.ObjectId('6228c28062a950a467600673'),
    //         mongoose.Types.ObjectId('6228c28062a950a467600675'),
    //         mongoose.Types.ObjectId('6228c28062a950a467600677'),
    //         mongoose.Types.ObjectId('6228c28062a950a467600679'),
    //         mongoose.Types.ObjectId('6228c28062a950a46760067b'),
    //     ],
    //     haveItems: [],
    // });
    return res.send('success');
});
*/
module.exports = router;
