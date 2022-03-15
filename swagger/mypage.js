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

/**
 * @swagger
 * /api/mypage/like:
 *   get:
 *    summary: "mypage 좋아요 모아보기"
 *    description: "유저가 좋아요한 첼린지 리스트를 반환한다."
 *    tags: [MyPage]
 *    parameters:
 *      - name: status
 *        in: query
 *        description: status from query string
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 좋아요 모아보기 성공 시
 */

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

/**
 * @swagger
 * /api/mypage/character:
 *   get:
 *    summary: "character 정보조회"
 *    description: "로그인한 유저의 character 정보를 불러온다."
 *    tags: [MyPage]
 *    responses:
 *      "200":
 *        description: character 정보 조회 성공 시
 */

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
