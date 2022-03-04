const express = require('express');
const router = express.Router();
const Proofshot = require('../models/proofShot');
const authMiddleware = require('../middlewares/auth-middleware');
const moment = require('moment');

router.get('/challenge', authMiddleware, async (req, res) => {
    let { user } = res.locals;
    let today = moment().format('YYYY-MM-DD');
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
        let pastDays = moment(today) - moment(moment(i._doc.startAt).format('YYYY-MM-DD'));
        let round = Math.floor(pastDays / 3) + 1;
        i._doc.round = round;
    }

    console.log(challenges);
    res.status(200).json({ challenges });
});

router.get('/proofShot', authMiddleware, async (req, res) => {
    // await Proofshot.create({ChallengeId})
    let { user } = res.locals;
    let proofShots = await Proofshot.find({ userId: user._id }).select({
        _id: 1,
        imgUrl: 1,
        createdAt: 1,
    });
    console.log(proofShots);
    res.status(200).json({ proofShots });
});

router.get('/proofShot/:proofShotId', authMiddleware, async (req, res) => {
    let { user } = res.locals;
    const { proofShotId } = req.params;

    let proofShot = await Proofshot.findOne({
        userId: user._id,
        _id: proofShotId,
    });
    console.log(proofShot);
    res.status(200).json({ proofShot });
});

module.exports = router;
