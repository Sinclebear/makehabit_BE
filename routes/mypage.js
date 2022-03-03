const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Challenge = require('../models/challenge');
const Proofshot = require('../models/proofShot');

const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth-middleware');
const { create } = require('../models/user');

function cntDate(date){
    let today = new Date();
    //let start = i._doc.startAt;
    let start = new Date(date.getFullYear(),date.getMonth(),date.getDate());
    let end = new Date(today.getFullYear(),today.getMonth(),today.getDate());
    let days = (end - start)/(60*60*24*1000);
    // console.log(start);
    // console.log(end);
    // console.log(days);

    return days;
}


router.get('/challenge', authMiddleware,async (req, res) => {
   // await Proofshot.create({ChallengeId})
    let { user } = res.locals;
    user = await user.populate('participate','title _id participants thumbnail startAt');
    let challenges = user.participate;
    
    let today = new Date();
    let today_start = new Date(today.getFullYear(),today.getMonth(),today.getDate());
    let today_end = new Date(today_start.getFullYear(),today_start.getMonth(),today_start.getDate()+1);
    
    for(i of challenges){
        //참여자 수
        i._doc.participants = i._doc.participants.length;
       
        //금일 인증 여부
        if(await Proofshot.findOne({
            challengeId:i._doc._id,
            createdAt: {
                $gte: new Date(today_start).toISOString(),
                $lte: new Date(today_end).toISOString()
            }
        })){
            i._doc.isUpload=true;
        }
        else i._doc.isUpload=false;
        
        //회차
        let pastDays = cntDate(i._doc.startAt)
        let round = Math.floor(pastDays/3)+1
        i._doc.round=round;
    }
    
    res.status(200).json({challenges});
    // for(i of user.participate){
    //     i.participants = i.participants.length;

    // }
});

router.get('/proofShot', authMiddleware,async (req, res) => {
    // await Proofshot.create({ChallengeId})
    let { user } = res.locals;
    console.log(user._id);
    let proofShots = await Proofshot.find({userId:user._id}).select({_id:1,imgUrl:1,createdAt:1});
    console.log(proofShots);
    res.status(200).json({proofShots})
 });

 router.get('/proofShot/:proofShotId', authMiddleware,async (req, res) => {
    let { user } = res.locals;
    console.log(user._id);
    let proofShot = await Proofshot.findOne({userId:user._id});
    console.log(proofShot);
    res.status(200).json({proofShot}) 
 });

module.exports = router;