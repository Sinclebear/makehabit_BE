const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const myPageCtl = require('../controller/mypage');

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

//내가 참여중인 첼린지 모아보기
router.get('/challenge', authMiddleware, myPageCtl.getMyChallenge);

// 좋아요 모아보기. 시안이 안나와서, 우선 챌린지 보기와 거의 동일하게 작성. calcIsLike만 추가.
router.get('/like', authMiddleware, myPageCtl.getMyLikeChallenge);

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

//내 인증샷 모아보기
router.get('/proofShot', authMiddleware, myPageCtl.getMyProofShot);

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
router.get('/proofShot/:proofShotId', authMiddleware, myPageCtl.getDetailProofShot);

//캐릭터 정보 조회 API
router.get('/character', authMiddleware, myPageCtl.getCharacterInfo);

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
    await Character.create({
        userId: mongoose.Types.ObjectId('6225beaf5290efcb7e5bfab8'),
        characterCurrentPoint: 50000,
        equippedItems: [
            mongoose.Types.ObjectId('6228c28062a950a467600673'),
            mongoose.Types.ObjectId('6228c28062a950a467600675'),
            mongoose.Types.ObjectId('6228c28062a950a467600677'),
            mongoose.Types.ObjectId('6228c28062a950a467600679'),
            mongoose.Types.ObjectId('6228c28062a950a46760067b'),
        ],
        haveItems: [
            mongoose.Types.ObjectId('6228c28062a950a467600673'),
            mongoose.Types.ObjectId('6228c28062a950a467600675'),
            mongoose.Types.ObjectId('6228c28062a950a467600677'),
            mongoose.Types.ObjectId('6228c28062a950a467600679'),
            mongoose.Types.ObjectId('6228c28062a950a46760067b'),
        ],
    });
    return res.send('success');
});
*/

module.exports = router;
