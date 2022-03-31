const moment = require('moment');
const Proofshot = require('../models/proofShot');
const User = require('../models/user');

//두 수 min과 max사이의 난수 생성하기
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = {
    //challegeId 추가하는 함수
    plusChallengeId: (challenges) => {
        for (const i of challenges) {
            i.challengeId = i._id;
        }
    },
    // isLike 계산해주는 함수
    calcIsLike: async (challenges, user) => {
        for (const i of challenges) {
            if (!user) {
                i.isLike = false;
            } else {
                let challengeId = i._id;
                let existUser = await User.findById(user);
                let userLikes = existUser.likes;
                if (userLikes.includes(challengeId)) {
                    i.isLike = true;
                } else {
                    i.isLike = false;
                }
            }
        }
    },
    //isParticipate 계산함수
    calcIsParticipate: async (challenges, user) => {
        for (const i of challenges) {
            if (!user) {
                i.isParticipate = false;
            } else {
                let challengeId = i._id;
                let existUser = await User.findById(user);
                let userParticipate = existUser.participate;
                if (userParticipate.includes(challengeId)) {
                    i.isParticipate = true;
                } else {
                    i.isParticipate = false;
                }
            }
        }
    },

    //status 계산
    calcStatus: (challenges) => {
        for (const i of challenges) {
            const start = i.startAt;
            const cur = new Date().toLocaleDateString();
            const end = new Date(cur); //    3/8:15:00
            const dateDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
            if (dateDiff <= 0) {
                i.status = 1; //시작 전
            } else if (dateDiff > 30) {
                i.status = 2; //완료
            } else {
                i.status = 0; //진행중
            }
        }
    },
    // 수정 가능한지 조사
    calcChangeable: (challenges, userId) => {
        for (const i of challenges) {
            let startAt = i.startAt;
            let today = new Date().toDateString();
            let checkpoint = new Date(today);
            if (i.madeBy.toString() !== userId || startAt - checkpoint <= 0) {
                i.isChangeable = false;
            } else {
                i.isChangeable = true;
            }
        }
    },
    calcIsHost: (challenges, userId) => {
        for (const i of challenges) {
            if (i.madeBy.toString() !== userId.toString()) {
                i.isHost = false;
            } else {
                i.isHost = true;
            }
        }
    },

    calcUploadStatus: (challenges) => {
        for (const i of challenges) {
            const start = i.startAt;
            const cur = new Date().toLocaleDateString();
            const end = new Date(cur); //    3/8:15:00
            const dateDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
            if (dateDiff < 0) {
                i.status = 1; //시작 전
            } else if (dateDiff > 30) {
                i.status = 2; //완료
            } else {
                i.status = 0; //진행중
            }
        }
    },

    //참여자 수 계산
    calcParticipants: (challenges) => {
        for (const i of challenges) {
            i.participants = i.participants.length;
        }
    },
    calcUserLikes: (challenges) => {
        for (const i of challenges) {
            i.likeUsers = i.likeUsers.length;
        }
    },

    //총 인증횟수 계산 await
    calcProofCnt: async (challenges, userId) => {
        for (const i of challenges) {
            let challengeId = i._id;
            let proofCount = await Proofshot.count({ challengeId, userId });
            i.proofCount = proofCount;
        }
    },

    //경과 날짜, round 계산
    calcPastDaysAndRound: (challenges) => {
        let today = Date.now(); //moment().format('YYYY-MM-DD'); //2022-03-05 00:00:00
        for (const i of challenges) {
            let pastDays = (new Date(today) - new Date(i.startAt)) / (1000 * 60 * 60 * 24);
            pastDays += 1;
            i.pastDays = Math.floor(pastDays); // 일 미만 단위의 시간 버림 처리
            i.round = Math.floor((pastDays - 1) / 3) + 1;
        }
    },

    //유저 금일 업로드 체크 await
    calcUserIsUpload: async (challenges, userId) => {
        let today = new Date(moment().format('YYYY-MM-DD')); //2022-03-05 00:00:00Z     15:00Z
        for (const i of challenges) {
            const todayProofshot = await Proofshot.findOne({
                challengeId: i._id,
                userId: userId,
                createdAt: {
                    $gte: new Date(moment(today).add(-9, 'hours')),
                    $lt: new Date(moment(today).add(15, 'hours')),
                },
            });
            if (!todayProofshot) {
                i.isUpload = false;
            } else {
                i.isUpload = true;
            }
        }
    },

    calcProbability: () => {
        //0 부터 100 사이의 난수 생성하기
        let probability = getRandomArbitrary(0, 100);
        let point;
        if (probability < process.env.COMMON) {
            point = 300;
        } else if (probability < process.env.UNCOMMON) {
            point = 500;
        } else if (probability < process.env.RARE) {
            point = 700;
        } else if (probability < process.env.EPIC) {
            point = 1000;
        } else {
            point = 3000;
        }
        return point;
    },
};
