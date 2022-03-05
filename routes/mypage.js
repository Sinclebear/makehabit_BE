const express = require('express');
const router = express.Router();
const Proofshot = require('../models/proofShot');
const authMiddleware = require('../middlewares/auth-middleware');
const moment = require('moment');
/**
 * @swagger
 * /api/mypage/challenge:
 *   get:
 *    summary: "mypage challenge list 불러오기 (하단 인증 탭)"
 *    description: "mypage challenge list 불러오기 (하단 인증 탭)"
 *    tags: [MyPage]
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
    if (user === undefined) {
        return res.status(400).json({ errorMessage: '로그인 후 사용하시오' });
    }

    let today = moment().format('YYYY-MM-DD'); //2022-03-05 00:00:00
    user = await user.populate('participate', 'title _id participants thumbnail startAt');
    let challenges = user.participate;
    for (const i of challenges) {
        //참여자 수
        i._doc.participants = i._doc.participants.length;

        //금일 인증 여부
        if (
            await Proofshot.findOne({
                challengeId: i._doc._id,
                createdAt: {
                    $gte: new Date(today).toISOString(),
                    $lt: new Date(moment(today).add(1, 'days')).toISOString(),
                },
            })
        ) {
            i._doc.isUpload = true;
        } else i._doc.isUpload = false;

        //회차
        let pastDays =
            (moment(today) - moment(moment(i._doc.startAt).format('YYYY-MM-DD'))) /
            (1000 * 60 * 60 * 24);
        let round = Math.floor(pastDays / 3) + 1;
        i._doc.round = round;
    }

    console.log(challenges);
    return res.status(200).json({ challenges });
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
        return res.status(400).json({ errorMessage: '로그인 후 사용하시오' });
    }

    let proofShots = await Proofshot.find({ userId: user._id }).select({
        _id: 1,
        imgUrl: 1,
        createdAt: 1,
    });
    console.log(proofShots);
    return res.status(200).json({ proofShots });
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
        return res.status(400).json({ errorMessage: '로그인 후 사용하시오' });
    }

    const { proofShotId } = req.params;
    let proofShot = await Proofshot.findOne({
        _id: proofShotId,
        //userId: user.userId,
    });
    console.log(proofShot);
    return res.status(200).json({ proofShot });
});

module.exports = router;
